import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { User } from './schemas/user.schemas';
import { LoginDto } from './dto/login.dto';
import { AuthGuardD } from './guard/auth.guard';
import { CurrentUser } from './decorator/currentUser.decorator';

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
    return user; // Trả về thông tin user hiện tại
  }

}
