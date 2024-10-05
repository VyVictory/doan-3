import { Body, Controller, Get, HttpException, Post, Put, UseGuards,HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './schemas/user.schemas';
import { LoginDto } from './dto/login.dto';
import { AuthGuardD } from './guard/auth.guard';
import { CurrentUser } from './decorator/currentUser.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
  @UseGuards(AuthGuardD) // Sử dụng guard để bảo vệ route
  async getCurrentUser(@CurrentUser() user: any) {
    console.log(user);
    return user; // Trả về thông tin user hiện tại
  }

  @Put('update')
  @UseGuards(AuthGuardD)
  async updateUser(@CurrentUser() currentUser: User, @Body() updateData: UpdateUserDto) {
      // Log toàn bộ currentUser để kiểm tra
      console.log('Current User:', currentUser);
      console.log('Current User:', User);
  
      // Kiểm tra nếu currentUser không tồn tại
      if (!currentUser) {
          throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
      }
      
      // Log _id của currentUser
     // console.log('Current User ID:', currentUser._id ? currentUser._id.toString() : 'ID is undefined');
  
      // Nếu bạn muốn chỉ cho phép cập nhật một số trường, có thể thêm logic kiểm tra ở đây
      return this.userService.updateUser(currentUser._id.toString(), updateData);
  }


  @Put('change-password')
    @UseGuards(AuthGuardD) // Bảo vệ route bằng guard
    async changePassword(
        @CurrentUser() currentUser: User, 
        @Body() changePasswordDto: ChangePasswordDto
    ) {
        return this.userService.changePassword(currentUser._id.toString(), changePasswordDto);
    }
  

}
