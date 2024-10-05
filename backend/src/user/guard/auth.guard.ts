import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user.service';
import { TokenExpiredError } from 'jsonwebtoken'; // Import TokenExpiredError

@Injectable()
export class AuthGuardD implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      // 1) Lấy token từ header
      const authorizationHeader = request.headers.authorization;
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new ForbiddenException('Please provide a valid access token');
      }

      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        throw new ForbiddenException('Token missing from authorization header');
      }

      // 2) Xác minh token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // 3) Tìm người dùng từ cơ sở dữ liệu bằng token
      const user = await this.userService.findById(payload.userId);
      if (!user) {
        throw new BadRequestException(
          'User not found for the token, please try again',
        );
      }

      // Gắn người dùng hiện tại vào request
      request.currentUser = user;
    } catch (error) {
      console.error('Error in AuthGuardD:', error);

      // Kiểm tra nếu lỗi là TokenExpiredError
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token has expired, please log in again');
      }

      throw new ForbiddenException('Invalid token or expired');
    }

    return true;
  }
}


// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user.service';

// @Injectable()
// export class AuthGuardD implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private userService: UserService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     try {
//       // 1) Lấy token từ header
//       const authorizationHeader = request.headers.authorization;
//       if (!authorizationHeader) {
//         throw new UnauthorizedException('Please provide access token');
//       }

//       const token = authorizationHeader.split(' ')[1];
//       if (!token) {
//         throw new ForbiddenException('Please provide access token');
//       }

//       // 2) Xác minh token
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });

//       // 3) Tìm người dùng từ cơ sở dữ liệu bằng token
//       const user = await this.userService.findById(payload.userId);
//       if (!user) {
//         throw new BadRequestException(
//           'User not found for the token, please try again',
//         );
//       }
//       request.currentUser = user;
//     } catch (error) {
//       console.error('Error in AuthGuardD:', error); // Thêm nhật ký lỗi để kiểm tra
//       throw new ForbiddenException('Invalid token or expired');
//     }
//     return true;
//   }
// }

