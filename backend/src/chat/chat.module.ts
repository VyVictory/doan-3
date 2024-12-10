import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.geteway';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuththenticationSoket } from 'src/user/guard/authSocket.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { GroupMessage, GroupMessageSchema } from './schema/groupMessage.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema}]),
    MongooseModule.forFeature([{ name: 'GroupMessage', schema: GroupMessageSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, JwtModule, JwtService, AuththenticationSoket],
})
export class ChatModule {}
