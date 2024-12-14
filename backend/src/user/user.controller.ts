import { Body, Controller, Get, HttpException, Post, Put, UseGuards,HttpStatus, BadRequestException, Param, UseInterceptors, UploadedFiles, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './schemas/user.schemas';
import { LoginDto } from './dto/login.dto';
import { AuthGuardD } from './guard/auth.guard';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { RolesGuard } from './guard/role.guard';
import { OtpService } from 'src/otp/otp.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { UploadAvatarDto } from './dto/uploadAvartar.dto';
import { UploadCoverImgDto } from './dto/uploadCoverImg.dto';
import { OptionalAuthGuard } from './guard/optional.guard';
import { Types } from 'twilio/lib/rest/content/v1/content';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private otpService: OtpService,
  ) {}

  @Post('register')
  signUp(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body('userId') userId: string,
  @Body('refreshToken') refreshToken: string) {
    return this.userService.refreshToken(userId, refreshToken);
  }

  @Get('current')
  @UseGuards(AuthGuardD)
  async getCurrentUser(@CurrentUser() user: any) {
    console.log(user);
    return user; 
  }



  @Put('update')
  @UseGuards(AuthGuardD)
  async updateUser(@CurrentUser() currentUser: User, @Body() updateData: UpdateUserDto) {
      // Log toàn bộ currentUser để kiểm tra
      console.log('Current User:', currentUser);
      console.log('Current User:', User);
  
      if (!currentUser) {
          throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
      }
      
      //Log _id của currentUser
      //console.log('Current User ID:', currentUser._id ? currentUser._id.toString() : 'ID is undefined');
  
      return this.userService.updateUser(currentUser._id.toString(), updateData);
  }


  @Put('change-password')
    @UseGuards(AuthGuardD) 
    async changePassword(
        @CurrentUser() currentUser: User, 
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return this.userService.changePassword(currentUser._id.toString(), changePasswordDto);
    }


    @Get('getAllUser')
    async getAllUser(
      @CurrentUser() currentUser : User,
    ){
      return this.userService.findAlluser()
    }

    @Post('send-otp-resetpassword')
    @UseGuards(AuthGuardD) // Đảm bảo người dùng đã đăng nhập
    async sendOtp(@CurrentUser() currentUser: User) {
      try {
        console.log('currentUser:', currentUser); // Kiểm tra toàn bộ đối tượng currentUser
        const email = currentUser?.email;
        if (!email) {
          throw new Error("Email is required");
        }
        await this.otpService.sendOtp(currentUser.email, 'Reset password');
        return { message: 'OTP sent to your email.' };
      } catch (error) {
        console.error(error); // Log lỗi chi tiết
        throw new BadRequestException(error.message);
      }
    }

    @Post('verify-otp')
    async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
        try {
            const isOtpValid = await this.otpService.verifyOtp(email, otp);
            if (isOtpValid) {
                return { message: 'OTP verified successfully' };
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Post('reset-password')
    @UseGuards(AuthGuardD) 
    async resetPassword(
      @CurrentUser() currentUser: User, // Lấy thông tin người dùng từ currentUser
      @Body('otp') otp: string, // Lấy OTP từ body
      @Body() resetPasswordDto: ResetPasswordDto, // Lấy mật khẩu mới từ body
    ) {
      try {
        const message = await this.userService.resetPassword(
          currentUser.email, 
          otp,
          resetPasswordDto,
        );
        return { message };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }


    @Get('getDetailUser/:userId')
    async getDetailUser(
      @Param('userId')
      userId: string,
    ){
      return this.userService.findById(userId)
}


  @Post('upload-avatar')
  @UseGuards(AuthGuardD)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 1 }]))
  async uploadAvatar(
  @CurrentUser() currentUser: User,
  @Body() uploadAvatarDto : UploadAvatarDto,
  @UploadedFiles() files: { files: Express.Multer.File[]}
  ){
    return this.userService.uploadAvatar(uploadAvatarDto, currentUser._id.toString(),  files.files);
  }


  @Post('uploadcoveravatar')
  @UseGuards(AuthGuardD)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 1 }]))
  async uploadCoverAvatar(
  @CurrentUser() currentUser: User,
  @Body() uploadCoverImgDto : UploadCoverImgDto,
  @UploadedFiles() files: { files: Express.Multer.File[]}
  ){
    return this.userService.uploadCoverImage(uploadCoverImgDto, currentUser._id.toString(),  files.files);
  }

  @Post(':postId/bookmark')
  @UseGuards(AuthGuardD)
  async savePost(@CurrentUser() currentUser: User, @Param('postId') postId: string) {
    return this.userService.savePost(currentUser._id.toString(), postId);
  }
  @Delete(':postId/bookmark')
  @UseGuards(AuthGuardD)
  async removeSavedPost(@CurrentUser() currentUser: User, @Param('postId') postId: string) {
    return this.userService.removeSavedPost(currentUser._id.toString(), postId);
  }
  @Get(':userId/bookmark')
  @UseGuards(AuthGuardD)
  async getSavedPosts(@CurrentUser() currentUser: User) {
    return this.userService.getSavedPosts(currentUser._id.toString());
  }

  @Post('friendrequest/:userId')
  @UseGuards(AuthGuardD)
  async friendRequest(
    @CurrentUser() currentUser: User,
    @Param('userId') userId: string,
  ){
    return this.userService.FriendsRequest(currentUser._id.toString(), userId);
  }

  @Post('acceptfriend/:friendRequestId')
  @UseGuards(AuthGuardD)
  async acceptFriend(
    @CurrentUser() currentUser: User,
    @Param('friendRequestId') friendRequestId: string,
  ){
    return this.userService.acceptRequestFriends(currentUser._id.toString(), friendRequestId);
  }

  @Post('rejectFriendRequest/:friendRequestId')
  @UseGuards(AuthGuardD)
  async rejectFriendRequest(
    @CurrentUser() currentUser: User,
    @Param('friendRequestId') friendRequestId: string,
  ){
    return this.userService.rejectFriendRequest(currentUser._id.toString(), friendRequestId);
  }
  
  @Get('getMyFriendRequest')
  @UseGuards(AuthGuardD)
  async getMyFriendRequest(
    @CurrentUser() currentUser: User,
  ){
    return this.userService.getMyFriendRequest(currentUser._id.toString());
  }

    @Delete('unfriend/:friendId')
    @UseGuards(AuthGuardD)
    async unfriend(
      @CurrentUser() currentUser: User,
      @Param('friendId') friendId: string,
    ){
      return this.userService.unFriend(currentUser._id.toString(), friendId);
    }

    @Get('getMyFriend')
    @UseGuards(AuthGuardD)
    async getMyFriend(
      @CurrentUser() currentUser: User,
    ){
      
      return this.userService.getMyFriend(currentUser._id.toString());
    }



}
