// src/schemas/groupMessage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
    })

export class GroupMessage extends Document {

  @Prop({ required: true })
  groupId: string; // ID của nhóm

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  message: string; // Nội dung tin nhắn
}


export const GroupMessageSchema = SchemaFactory.createForClass(GroupMessage);
