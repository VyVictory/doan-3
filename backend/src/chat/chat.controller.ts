import { Controller, Post, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Types } from 'mongoose';
import { AuthGuardD } from 'src/user/guard/auth.guard';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { User } from 'src/user/schemas/user.schemas';
import { CreateGroupDto } from './dto/createGroup.dto';


@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
    )
    {}

    @Post('creategroup')
    @UseGuards(AuthGuardD)
    async createGroupChat(
        @CurrentUser() currentUser: User, // Lấy user hiện tại từ JWT
        @Body() createGroupDto: CreateGroupDto, // DTO tạo nhóm
      ) {
        if (!currentUser) {
          throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.chatService.createGroup(createGroupDto, currentUser._id.toString());
      }

}