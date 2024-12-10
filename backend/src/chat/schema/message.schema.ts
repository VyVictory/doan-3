
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true,
})
export class Message extends Document{

  @Prop({ required: true })
  senderId: string; // ID người gửi

  @Prop({ required: true })
  receiverId: string; // ID người nhận

  @Prop({ required: true })
  message: string; // Nội dung tin nhắn

  @Prop({ default: false })
  isRead: boolean; // Đã đọc hay chưa
    

}

export const MessageSchema = SchemaFactory.createForClass(Message)