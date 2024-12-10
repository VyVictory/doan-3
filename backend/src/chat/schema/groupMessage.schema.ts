// src/schemas/groupMessage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
  })

export class GroupMessage extends Document {

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  members: Types.ObjectId[]; // Danh sách thành viên trong nhóm

  @Prop({ required: true })
  groupName: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId; 

  @Prop({
    required: true,
    type: [
      {
        author: { type: Types.ObjectId, ref: 'User' }, // ID người gửi
        content: { type: String }, // Nội dung tin nhắn
        reading: { type: [Types.ObjectId], default: [] }, // Mảng các người dùng đã đọc tin nhắn
        img: { type: String, required: false }, // Hình ảnh đính kèm
        video: { type: String, required: false }, // Video đính kèm
        createdAt: { type: Date, default: Date.now }, // Thời gian gửi tin nhắn
      },
    ],
    default: [],
  })
  messages: {
    author: Types.ObjectId;
    content: string;
    reading: Types.ObjectId[];
    img?: string;
    video?: string;
    createdAt: Date;
  }[];

}


export const GroupMessageSchema = SchemaFactory.createForClass(GroupMessage);
