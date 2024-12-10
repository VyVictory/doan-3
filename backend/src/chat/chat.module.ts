import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.geteway';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuththenticationSoket } from 'src/user/guard/authSocket.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Message } from './schema/message.schema';

@Module({
  imports: [
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, JwtModule, JwtService, AuththenticationSoket],
})
export class ChatModule {}
