import {
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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async generateToken(userId): Promise<{ accessToken: string }> {
    const accessToken = this.jwtService.sign({ userId });

    return {
      accessToken,
    };
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

  async findById(úserId: string): Promise<User> {
    const user = await this.UserModel.findById(úserId).exec();
    if (!user) {
      throw new NotFoundException('404: user not fuond');
    }
    return user;
  }
}
