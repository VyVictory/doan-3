import { Body, Controller, Get, HttpException, Post, Put, UseGuards,HttpStatus, BadRequestException, Param } from '@nestjs/common';
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
import { ResetPasswordDto } from './dto/resetPassword.dto';

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
}
