import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from './schema/message.schema';
import { GroupMessage } from './schema/groupMessage.schema';
import { User } from '../user/schemas/user.schemas';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
        @InjectModel(GroupMessage.name) private readonly GroupMessageModel: Model<GroupMessage>,
        @InjectModel(User.name) private readonly UserModel: Model<User>,
    ){}

    async createGroup(createGroupDto: CreateGroupDto, owner: string): Promise<GroupMessage> {
        const { groupName, members } = createGroupDto;
    
        // Lấy thông tin chủ sở hữu nhóm từ bảng User
        const ownerUser = await this.UserModel.findById(owner).select('firstName lastName').exec();
        if (!ownerUser) {
          throw new Error('Owner not found');
        }
    
        // Tạo tên nhóm
        const settingGroupName = `Nhóm được tạo bởi ${ownerUser.firstName} ${ownerUser.lastName}`;
    
        // Thêm chủ sở hữu vào danh sách thành viên nhóm
        const allMembers = [owner, ...members];
    
        // Tạo nhóm mới
        const group = new this.GroupMessageModel({
          owner,
          groupName: settingGroupName,
          members: allMembers,
          messages: [], // Mảng tin nhắn ban đầu rỗng
        });
    
        // Lưu nhóm vào cơ sở dữ liệu
        return group.save();
      }



      async sendMessageToGroup(
        groupId: string,
        authorId: Types.ObjectId,
        content: string,
        img?: string,
        video?: string
      ) {
        const group = await this.GroupMessageModel.findById(groupId);
      
        if (!group) {
          throw new Error('Group not found');
        }
      
        const newMessage = {
          author: authorId,
          content,
          reading: [],
          img,
          video,
          createdAt: new Date(),
        };
      
        group.messages.push(newMessage);
        const updatedGroup = await group.save();
        return updatedGroup;
      }
}


