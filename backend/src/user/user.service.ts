import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { FriendRequest } from './schemas/friend.schema';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(FriendRequest.name) private FriendRequestModel: Model<FriendRequest>,
    private jwtService: JwtService,
    private configService: ConfigService,
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

    // Tìm người dùng bằng email hoặc số điện thoại
    const user = await this.UserModel.findOne({
      $or: [
        { numberPhone }, // Tìm theo số điện thoại
        { email }, // Tìm theo email
      ],
    });

    // Nếu người dùng không tồn tại
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
    
    // Trả về token nếu đăng nhập thành công
    return this.generateToken(user._id);
  }


  async findById(userId: string): Promise<Omit<User, 'password' | 'isActive' | 'role' | 'createdAt' | 'updatedAt'>> {
    const user = await this.UserModel.findById(userId)
      .select('-password -isActive -role -createdAt -updatedAt') // Không trả về các trường này
      .exec();

    if (!user) {
      throw new NotFoundException('404: user not found');
    }

    return user;
  }

  async FriendsRequest(senderID: string, ReceiverId: string) {
    const exitingRequest = await this.FriendRequestModel.findById({ sender: senderID, receiver: ReceiverId })
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

  async acceptRequestFriends(FriendsRequestId: string) {
    //dầu tiên tìm yêu cầu kết bạn dựa trên ID Request
    const friendRequest = await this.FriendRequestModel.findById({ FriendsRequestId })
    if (!friendRequest) {
      throw new NotFoundException('no has Friends Request')
    }
    const { sender, receiver } = friendRequest;
    // thim bạng vào list friend của người rửi và người nhặn
    //cái nầy là thim dô người nhận 
    await this.UserModel.findByIdAndUpdate(
      receiver, {
      $addToSet: { friends: sender }
    }
    );
    await this.UserModel.findByIdAndUpdate(
      sender,
      {
        $addToSet: { friends: receiver }
      }
    );
    await this.FriendRequestModel.findByIdAndDelete(FriendsRequestId);
    return { message: 'friend request accepted successfully' }
  }

  async rejectFriendRequest(FriendsRequestId: string) {
    // Bước 1: Tìm yêu cầu kết bạn dựa trên ID
    const friendRequest = await this.FriendRequestModel.findById(FriendsRequestId);

    // Bước 2: Kiểm tra xem yêu cầu kết bạn có tồn tại không
    if (!friendRequest) {
      throw new NotFoundException('No such friend request found');
    }

    // Bước 3: Xóa yêu cầu kết bạn
    await this.FriendRequestModel.findByIdAndDelete(FriendsRequestId);

    // Bước 4: Trả về thông báo thành công
    return { message: 'Friend request rejected successfully' };
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
      // Find user by ID
      const user = await this.UserModel.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      // Check current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
      }

      // Check if new password is the same as the current password
      const isNewPasswordSameAsCurrent = await bcrypt.compare(newPassword, user.password);
      if (isNewPasswordSameAsCurrent) {
        throw new HttpException('New password cannot be the same as the current password', HttpStatus.BAD_REQUEST);
      }

      // Hash the new password
      user.password = await bcrypt.hash(newPassword, 10);

      // Save changes to the database
      await user.save();

      return { message: 'Password updated successfully' };
    } catch (error) {
      // Handle error and return a message without logging it
      if (error instanceof HttpException) {
        throw error; // If error is an HttpException, rethrow it
      }

      // For any unexpected errors, return a generic message
      throw new HttpException('Password update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
