// src/schemas/groupMessage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
  })

export class GroupMessage extends Document {

  @Prop({ type: [Types.ObjectId], ref: 'User' })
  members: Types.ObjectId[];

  @Prop({ required: true })
  groupName: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId; 

  @Prop({
    required: true,
    type: [
      {
        author: { type: Types.ObjectId, ref: 'User' },
        content: { type: String }, 
        reading: { type: [Types.ObjectId], default: [] }, 
        img: { type: String, required: false }, 
        video: { type: String, required: false }, 
        createdAt: { type: Date, default: Date.now }, 
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
