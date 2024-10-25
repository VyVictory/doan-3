import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Post extends Document {

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] }) 
  dislikes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] }) 
  comments: Types.ObjectId[];

  @Prop({ type: [String], default: [] }) 
  img: string[];

  @Prop({ default: true }) 
  isActive: boolean;

  @Prop({ type: String, enum: ['public', 'friends', 'private', 'specific'], default: 'public' })
  privacy: string; // ừ thì cái này dóng quyền riêng từ bên fở pò á


  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  allowedUsers: Types.ObjectId[]; //cái này là chọn 1 vài cháu có thể sem bài diếc

}

export const PostSchema = SchemaFactory.createForClass(Post);
