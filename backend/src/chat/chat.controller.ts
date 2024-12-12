import { Controller, Post, Body, UseGuards, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Types } from 'mongoose';
import { AuthGuardD } from 'src/user/guard/auth.guard';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { User } from 'src/user/schemas/user.schemas';
import { CreateGroupDto } from './dto/createGroup.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { EventService } from '../event/event.service';



@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly eventService : EventService
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

      @Post('sendmessage/:groupId')
      @UseGuards(AuthGuardD)
      async sendMessageToGroup(
        @CurrentUser() currentUser: User,
        @Param('groupId') groupId: string,
        @Body() sendMessageDto: SendMessageDto,
      ) {
        if (!currentUser) {
          throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
      
        const currentUserID = new Types.ObjectId(currentUser._id as string);
        const message = await this.chatService.sendMessageToGroup(groupId, currentUserID, sendMessageDto);
        const messageSee = sendMessageDto;
      
        const groupParticipants = await this.chatService.getMemberGroup(groupId);
        
        if (!Array.isArray(groupParticipants)) {
          throw new HttpException('Invalid group participants data', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        groupParticipants.forEach(participant => {
          if (participant._id.toString() !== currentUser._id.toString()) {
            this.eventService.notificationToUser(participant._id.toString(), 'newmessage', messageSee);
          }
        });
      
        return message;
      }
      
    @Get('getmessagegroup/:groupId')
    async getMessageGroup(
      @Param('groupId') groupId: string,
    ){

      const messages = await this.chatService.getGroupMessages(groupId);
      return messages; 
    }

    @Get('MembersGroup/:idgr')
    @UseGuards(AuthGuardD)
    async getMembersGroup(
      @CurrentUser() currentUser: User,
      @Param('idgr') idgr: string,
    ){
      const members = await this.chatService.getMemberGroup(idgr);
      return members;
    }

    
    
}