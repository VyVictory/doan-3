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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message.name) private readonly MessageModel: Model<Message>,
        @InjectModel(GroupMessage.name) private readonly GroupMessageModel: Model<GroupMessage>,
        @InjectModel(Group.name) private readonly GroupModel: Model<Group>,
        @InjectModel(User.name) private readonly UserModel: Model<User>,
        private readonly cloudinaryService : CloudinaryService,
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


    async sendMessageToGroup(
      sendMessageDto: SendMessageDto, 
      userId: Types.ObjectId, 
      groupId: Types.ObjectId, 
      files?: Express.Multer.File[]
    ): Promise<GroupMessage> {
      const { content, mediaURL } = sendMessageDto;
    
      // Khởi tạo tin nhắn
      const groupMessage = new this.GroupMessageModel({
        group: groupId,
        sender: userId,

        content,
        reading: [],
      });
    

      if (files && files.length > 0) {
        try {
          
          const uploadedMedia = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
          
          groupMessage.mediaURL = uploadedMedia;
          
         
        } catch (error) {
          console.error('Error uploading images to Cloudinary:', error);
          throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }
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
  
        return group.participants;
      } catch (error) {
        console.error('Error fetching group members:', error);
        throw new HttpException('Failed to fetch group members', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // async getMylishChat(userId: Types.ObjectId): Promise<{ Group: Group[], Message: Message[] }> {
    //   const distinctUserIds = await this.MessageModel.distinct('sender', {
    //     $or: [{ sender: userId }, { receiver: userId }]
    //   });
    
    //   const messages = await this.MessageModel.find({
    //     $or: [
    //       { sender: { $in: distinctUserIds } },
    //       { receiver: { $in: distinctUserIds } }
    //     ],
    //   })
    //     .populate({
    //       path: 'sender',
    //       select: 'firstName lastName avatar',
    //     })
    //     .populate({
    //       path: 'receiver',
    //       select: 'firstName lastName avatar',
    //     })
    //     .sort({ createdAt: -1 }) 
    //     .exec();
    
    //   const uniqueMessages = messages.reduce((acc, message) => {
    //     const key = message.sender?.toString() || message.receiver?.toString(); 
    //     if (!acc.some(m => (m.sender?.toString() === key || m.receiver?.toString() === key))) {
    //       acc.push(message);
    //     }
    //     return acc;
    //   }, []);
    
    //   const groups = await this.GroupModel.find({ participants: userId })
    //     .populate({
    //       path: 'participants',
    //       select: 'name',
    //     })
    //     .exec();
    
    //   return {
    //     Group: groups,
    //     Message: uniqueMessages,
    //   };
    // }

    async getMylishChat(userId: Types.ObjectId): Promise<{ Group: Group[], Participants: any[] }> {
      // Lấy danh sách sender và receiver liên quan đến userId
      const distinctUserIds = await this.MessageModel.distinct('sender', {
        $or: [{ sender: userId }, { receiver: userId }]
      });
    
      // Lọc ra những người đã nhắn tin với userId và loại trừ bản thân
      const participants = await this.UserModel.find({
        _id: { $in: distinctUserIds, $ne: userId },
      }).select('firstName lastName avatar'); 
    
      // Lấy danh sách nhóm mà userId tham gia
      const groups = await this.GroupModel.find({ participants: userId })
      .select('name avatarGroup') 
      .exec();
    
      return {
        Group: groups,
        Participants: participants, // Trả về danh sách người tham gia mà không có thông tin tin nhắn
      };
    }
    

    async removeMemberInGroup(groupId: Types.ObjectId, userId: Types.ObjectId): Promise<Group> {
      const group = await this.GroupModel.findById(groupId);
      if (!group) {
        throw new HttpException('Group not found', HttpStatus.NOT_FOUND);
      }
    
      if (group.owner.toString() !== userId.toString()) {
        throw new HttpException('You are not the owner of this group', HttpStatus.UNAUTHORIZED);
      }
    
      group.participants = group.participants.filter((id) => id.toString() !== userId.toString());
      return await group.save();
    }
    

    async sendMesageToUser(
      senderId: Types.ObjectId,
      receiverId: Types.ObjectId, 
      sendMessageDto: SendMessageDto,
      files?: Express.Multer.File[]
    ): Promise<Message> {
      const { content } = sendMessageDto;
      const user = await this.UserModel.findById(receiverId);
      
      // Ensure the receiver exists
      if (!user) {
        throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
      }
    
      // Prepare the message object
      const Message = new this.MessageModel({
        sender: senderId,
        receiver: receiverId,
        content,
      });
    
      // Upload files if provided
      if (files && files.length > 0) {
        try {
          const uploadedMedia = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
          Message.mediaURL = uploadedMedia;  
        } catch (error) {
          console.error('Error uploading images to Cloudinary:', error);
          throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      // Save and return the message
      return await Message.save();
    }

    async getMessagesToUser(userId: Types.ObjectId, receiverId: Types.ObjectId): Promise<Message[]> {
      const messages = await this.MessageModel.find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ],
      })
        .sort({ createdAt: 1 }) 
        .exec();
    
      if (!messages.length) {
        throw new HttpException('No messages found', HttpStatus.NOT_FOUND);
      }
    
      return messages;
    }
    
}

