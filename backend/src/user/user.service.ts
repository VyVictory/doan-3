import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { User } from './schemas/user.schemas';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { FriendRequest } from './schemas/friend.schema';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { OtpService } from '../otp/otp.service';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UploadAvatarDto } from './dto/uploadAvartar.dto';
import { UploadCoverImgDto } from './dto/uploadCoverImg.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(FriendRequest.name) private FriendRequestModel: Model<FriendRequest>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cloudinaryService: CloudinaryService,
    private otpService: OtpService,
  ) { }

  async register(registerDto: RegisterDto): Promise<User> {
    const {
      numberPhone,
      email,
      firstName,
      lastName,
      address,
      gender,
      birthday,
      password,
    } = registerDto;

    const checkUSer = await this.UserModel.findOne({ numberPhone });
    if (checkUSer) {
      throw new HttpException(
        'the numberphone has account:(',
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const user = await this.UserModel.create({
      numberPhone,
      email,
      firstName,
      lastName,
      address,
      gender,
      birthday,
      password: hashPassword,
    });
    return user;
  }

  async generateToken(userId): Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = this.jwtService.sign({ userId });

    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string | number>('JWT_REFRESH_EXPIRES')
      }
    );
    await this.UserModel.findByIdAndUpdate(userId, { refreshToken });
    return {
      accessToken,
      refreshToken
    };
  }

  async refreshToken(userId: string, refreshToken: string): Promise<{ accessToken: string }> {
    const user = await this.UserModel.findById(userId);

    // Kiểm tra xem người dùng có tồn tại và refresh token có hợp lệ không
    if (!user || user.refreshToken !== refreshToken) {
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }

    // Xác thực refresh token bằng secret cho refresh token
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'), // Sử dụng secret cho refresh token từ config
      });
    } catch (error) {
      throw new HttpException('Refresh token expired', HttpStatus.UNAUTHORIZED);
    }

    // Tạo mới access token (không cần truyền secret và expiresIn vì đã cấu hình trong module)
    const accessToken = this.jwtService.sign({ userId });

    return { accessToken };
  }


  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { numberPhone, email, password } = loginDto;

    if (!numberPhone && !email) {
      throw new HttpException('Phone number or email is required', HttpStatus.BAD_REQUEST);
    }

    let user;
  if (numberPhone) {
    user = await this.UserModel.findOne({ numberPhone }).exec();
  } else if (email) {
    user = await this.UserModel.findOne({ email }).exec();
  }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    
    return this.generateToken(user._id);
  }


  async findByIdForAdmin(userId: string): Promise<User> {
    const user = await this.UserModel.findById(userId)
      .select('-password -isActive  -createdAt -updatedAt')
      .exec();
    if (!user) {
      throw new NotFoundException('404: user not found');
    }
    return user;
  }


  async findById(userId: string): Promise<User> {
    const user = await this.UserModel.findById(userId)
      .select('-password -isActive  -createdAt -updatedAt, -refreshToken') 
      .exec();
    if (!user) {
      throw new NotFoundException('404: user not found');
    }
    return user;
  }

  async FriendsRequest(senderID: string, ReceiverId: string) {
    const exitingRequest = await this.FriendRequestModel.findOne({ sender: senderID, receiver: ReceiverId })
    if (exitingRequest) {
      throw new ConflictException('request has been sent');
    }
    const newRequest = new this.FriendRequestModel({
      sender: senderID,
      receiver: ReceiverId,
      status: 'waitinng'
    })
    return newRequest.save()
  }



  async acceptRequestFriends(
    currentUserId: string,
    friendRequestId: string,
  ): Promise<{ message: string }> {

    const friendRequest = await this.FriendRequestModel.findById(friendRequestId);
    if (!friendRequest) {
      throw new NotFoundException('No friend request found');
    }
  
    const { sender, receiver } = friendRequest;
  

    if (currentUserId !== receiver.toString()) {
      throw new ForbiddenException('You are not authorized to accept this friend request');
    }
  

    await this.UserModel.findByIdAndUpdate(
      receiver,
      { $addToSet: { friends: sender } },
    );
  

    await this.UserModel.findByIdAndUpdate(
      sender,
      { $addToSet: { friends: receiver } },
    );
  
    await this.FriendRequestModel.findByIdAndDelete(friendRequestId);
  
    return { message: 'Friend request accepted successfully' };
  }
  

  async rejectFriendRequest(
    currentUserId: string, 
    friendRequestId: string,
  ): Promise<{ message: string }> {
   
    const friendRequest = await this.FriendRequestModel.findById(friendRequestId);

    if (!friendRequest) {
      throw new NotFoundException('No such friend request found');
    }
    const { receiver } = friendRequest;
  
    if (currentUserId !== receiver.toString()) {
      throw new ForbiddenException('You are not authorized to reject this friend request');
    }
    await this.FriendRequestModel.findByIdAndDelete(friendRequestId);

    return { message: 'Friend request rejected successfully' };
  }

  async removeFriendRequest(currentUserId: string, friendRequestId: string,): Promise<{ message: string }> {
    const friendRequest = await this.FriendRequestModel.findById(friendRequestId);
    if (!friendRequest) {
      throw new NotFoundException('No such friend request found');
    }
    const sender = friendRequest.sender;
    if (currentUserId !== sender.toString()) {
      throw new ForbiddenException('You are not authorized to delete this friend request');
    }
    await this.FriendRequestModel.findByIdAndDelete(friendRequestId);
    return { message: 'Friend request deleted successfully' };
  }
  
  async unFriend(currentUserId: string, friendId: string, ): Promise<{ message: string }> {
    await this.UserModel.findByIdAndUpdate(
      currentUserId,
      { $pull: { friends: friendId } },
    );
    await this.UserModel.findByIdAndUpdate(
      friendId,
      { $pull: { friends: currentUserId } },
    );
    return { message: 'Unfriended successfully' };
  }

  
  async updateUser(userId: string, updateData: any): Promise<User> {
    // Tìm người dùng theo ID
    const user = await this.UserModel.findById(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Loại bỏ các trường không được phép cập nhật như role, isActive, refreshToken
    const restrictedFields = ['role', 'isActive', 'refreshToken'];
    restrictedFields.forEach(field => {
      if (field in updateData) {
        delete updateData[field];
      }
    });

    // Cập nhật thông tin người dùng
    Object.assign(user, updateData);

    // Lưu thay đổi vào cơ sở dữ liệu
    return await user.save();
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;
    try {

      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
      }

      const isNewPasswordSameAsCurrent = await bcrypt.compare(newPassword, user.password);
      if (isNewPasswordSameAsCurrent) {
        throw new HttpException('New password cannot be the same as the current password', HttpStatus.BAD_REQUEST);
      }

      user.password = await bcrypt.hash(newPassword, 10);

      await user.save();
      return { message: 'Password updated successfully' };
    } catch (error) {

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException('Password update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async findAlluser() {
    try {
      const user =  await this.UserModel.find().exec()
      return user
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new HttpException('Could not retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async resetPassword(email: string, otp: string, resetPasswordDto: ResetPasswordDto): Promise<string> {
    // Xác thực OTP
    const isOtpValid = await this.otpService.verifyOtp(email, otp);
    if (!isOtpValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }
  
    // Cập nhật mật khẩu (băm mật khẩu mới)
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  
    return 'Password reset successfully';
  }

  async uploadCoverImage(uploadCoverImageDto: UploadCoverImgDto, userId: string, files?: Express.Multer.File[]): Promise<User> {
    // Tìm người dùng dựa trên ID
    const user = await this.UserModel.findById(userId);
  
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    // Kiểm tra số lượng file
    if (!files || files.length === 0) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (files.length > 1) {
      throw new HttpException('Only one file is allowed', HttpStatus.BAD_REQUEST);
    }
  
    try {
      // Upload file duy nhất
      const uploadedImage = await this.cloudinaryService.uploadFile(files[0]);
      user.coverImage = uploadedImage; // Cập nhật avatar cho người dùng
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  
    // Lưu người dùng sau khi cập nhật avatar
    return await user.save();
  }

  async uploadAvatar(uploadAvatarDto: UploadAvatarDto, userId :string,  files?: Express.Multer.File[]): Promise<User> {
    // Tìm người dùng dựa trên ID
    const user = await this.UserModel.findById(userId);
  
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!files || files.length === 0) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (files.length > 1) {
      throw new HttpException('Only one file is allowed', HttpStatus.BAD_REQUEST);
    }
  
    try {
      // Upload file duy nhất
      const uploadedImage = await this.cloudinaryService.uploadFile(files[0]);
      user.avatar = uploadedImage; 
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return await user.save();
  }
  async savePost(userId: string, postId: string): Promise<User> {
    const bookmarks = await this.UserModel.findById(userId);
    if (!bookmarks) {
      throw new Error('User not found');
    }
    await bookmarks.save();
    await this.UserModel.findByIdAndUpdate(userId, {
      $push: { bookmarks: postId},
    });
    return bookmarks;
  }
  async getSavedPosts(userId: string): Promise<User> {
    return this.UserModel.findById(userId).populate('bookmarks');
  }
}

