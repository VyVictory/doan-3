import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schema/message.schema';
import { GroupMessage } from './schema/groupMessage.schema';
import { User } from '../user/schemas/user.schemas';
import { CreateGroupDto } from './dto/createGroup.dto';
import { SendMessageDto } from './dto/sendMessage.dto';
import { content } from 'googleapis/build/src/apis/content';
import { Group } from './schema/group.schema';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
        @InjectModel(GroupMessage.name) private readonly GroupMessageModel: Model<GroupMessage>,
        @InjectModel(Group.name) private readonly GroupModel: Model<Group>,
        @InjectModel(User.name) private readonly UserModel: Model<User>,
    ){}


    async createGroup(createGroupDto: CreateGroupDto, userId: Types.ObjectId){
        const { name, avatarGroup, participants } = createGroupDto;

        const group = new this.GroupModel({
          name,
          avatarGroup,
          owner: userId,
          participants: [...participants, userId],
        });
    
        return await group.save();
    }


    async sendMessageToGroup(sendMessageDto: SendMessageDto, userId: Types.ObjectId, groupId : Types.ObjectId) : Promise<GroupMessage>{
        const { content, mediaURL,  } = sendMessageDto;

        const groupMessage = new this.GroupMessageModel({
          group: groupId,
          sender: userId,
          content,
          mediaURL,
          reading: [],

        });
        return await groupMessage.save();
    }

    async getGroupMessages(groupId: Types.ObjectId): Promise<{ group: any; messages: GroupMessage[] }> {
     
      const group = await this.GroupModel.findById(groupId)
        .populate({ 
          path: 'owner', 
          select: 'firstName lastName avatar' 
        })
        .populate({ 
          path: 'participants', 
          select: 'firstName lastName avatar'
        })
        .exec();
    
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }

      const messages = await this.GroupMessageModel.find({ group: groupId })
        .populate({ 
          path: 'sender', 
          select: 'firstName lastName avatar' 
        })
        .exec();
    
      if (!messages.length) { 
        throw new HttpException('Group has no messages', HttpStatus.NOT_FOUND);
      }

      return { group, messages };
    }

    async getMemberGroup(groupId: Types.ObjectId): Promise<User[]> {
      try {
        const swagerGroupId = new Types.ObjectId(groupId);
        const group = await this.GroupModel.findById(swagerGroupId)
          .populate({
            path: 'participants',
             model: 'User',
            select: '_id firstName lastName avatar', // chọn các trường muốn hiển thị
          })
          .exec();
    
        if (!group) {
          throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
        }
    
        // Trả về danh sách các thành viên trong group với thông tin chi tiết
        return group.participants;
      } catch (error) {
        console.error('Error fetching group members:', error);
        throw new HttpException('Failed to fetch group members', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
}

