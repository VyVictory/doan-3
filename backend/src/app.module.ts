import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { OtpController } from './otp/otp.controller';
import { OtpModule } from './otp/otp.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    PostModule,
    CommentModule,
    CloudinaryModule,
    OtpModule,
  ],
  controllers: [AppController, OtpController],
  providers: [AppService],
})
export class AppModule {}
