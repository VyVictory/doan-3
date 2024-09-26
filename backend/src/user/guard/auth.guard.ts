
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user.service";

@Injectable()
export class AuthGuardD implements CanActivate {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        try {
            // 1) Lấy token từ header
            const authorizationHeader = request.headers.authorization;
            if (!authorizationHeader) {
                throw new ForbiddenException('Please provide access token');
            }

            const token = authorizationHeader.split(' ')[1];
            if (!token) {
                throw new ForbiddenException('Please provide access token');
            }

            // 2) Xác minh token
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });

            // 3) Tìm người dùng từ cơ sở dữ liệu bằng token
            const user = await this.userService.findById(payload.userId);
            if (!user) {
                throw new BadRequestException('User not found for the token, please try again');
            }
            request.currentUser = user;

        } catch (error) {
            console.error('Error in AuthGuardD:', error); // Thêm nhật ký lỗi để kiểm tra
            throw new ForbiddenException('Invalid token or expired');
        }
        return true;
    }
}



// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//     CanActivate,
//     ExecutionContext,
//     Inject,
//     Logger,
//     mixin,
//     Optional,
//     UnauthorizedException
//   } from '@nestjs/common';
//   import * as passport from 'passport';
//   import { Type } from './interfaces';
//   import {
//     AuthModuleOptions,
//     IAuthModuleOptions
//   } from './interfaces/auth-module.options';
//   import { defaultOptions } from './options';
//   import { memoize } from './utils/memoize.util';
  
//   export type IAuthGuard = CanActivate & {
//     logIn<TRequest extends { logIn: Function } = any>(
//       request: TRequest
//     ): Promise<void>;
//     handleRequest<TUser = any>(
//       err: any,
//       user: any,
//       info: any,
//       context: ExecutionContext,
//       status?: any
//     ): TUser;
//     getAuthenticateOptions(
//       context: ExecutionContext
//     ): IAuthModuleOptions | undefined;
//     getRequest(context: ExecutionContext): any;
//   };
  
//   export const AuthGuard: (type?: string | string[]) => Type<IAuthGuard> =
//     memoize(createAuthGuard);
  
//   const NO_STRATEGY_ERROR = `In order to use "defaultStrategy", please, ensure to import PassportModule in each place where AuthGuard() is being used. Otherwise, passport won't work correctly.`;
//   const authLogger = new Logger('AuthGuard');
  
//   function createAuthGuard(type?: string | string[]): Type<IAuthGuard> {
//     class MixinAuthGuard<TUser = any> implements CanActivate {
//       @Optional()
//       @Inject(AuthModuleOptions)
//       protected options: AuthModuleOptions = {};
  
//       constructor(@Optional() options?: AuthModuleOptions) {
//         this.options = options ?? this.options;
//         if (!type && !this.options.defaultStrategy) {
//           authLogger.error(NO_STRATEGY_ERROR);
//         }
//       }
  
//       async canActivate(context: ExecutionContext): Promise<boolean> {
//         const options = {
//           ...defaultOptions,
//           ...this.options,
//           ...(await this.getAuthenticateOptions(context))
//         };
//         const [request, response] = [
//           this.getRequest(context),
//           this.getResponse(context)
//         ];
//         const passportFn = createPassportContext(request, response);
//         const user = await passportFn(
//           type || this.options.defaultStrategy,
//           options,
//           (err, user, info, status) =>
//             this.handleRequest(err, user, info, context, status)
//         );
//         request[options.property || defaultOptions.property] = user;
//         return true;
//       }
  
//       getRequest<T = any>(context: ExecutionContext): T {
//         return context.switchToHttp().getRequest();
//       }
  
//       getResponse<T = any>(context: ExecutionContext): T {
//         return context.switchToHttp().getResponse();
//       }
  
//       async logIn<TRequest extends { logIn: Function } = any>(
//         request: TRequest
//       ): Promise<void> {
//         const user = request[this.options.property || defaultOptions.property];
//         await new Promise<void>((resolve, reject) =>
//           request.logIn(user, this.options, (err) =>
//             err ? reject(err) : resolve()
//           )
//         );
//       }
  
//       handleRequest(err, user, info, context, status): TUser {
//         if (err || !user) {
//           throw err || new UnauthorizedException();
//         }
//         return user;
//       }
  
//       getAuthenticateOptions(
//         context: ExecutionContext
//       ): Promise<IAuthModuleOptions> | IAuthModuleOptions | undefined {
//         return undefined;
//       }
//     }
//     const guard = mixin(MixinAuthGuard);
//     return guard as Type<IAuthGuard>;
//   }
  
//   const createPassportContext =
//     (request, response) => (type, options, callback: Function) =>
//       new Promise<void>((resolve, reject) =>
//         passport.authenticate(type, options, (err, user, info, status) => {
//           try {
//             request.authInfo = info;
//             return resolve(callback(err, user, info, status));
//           } catch (err) {
//             reject(err);
//           }
//         })(request, response, (err) => (err ? reject(err) : resolve()))
//       );