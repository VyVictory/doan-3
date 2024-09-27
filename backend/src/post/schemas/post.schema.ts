import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Liên kết tới User
  author: Types.ObjectId;

  @Prop({ default: 0 }) // Số lượng lượt thích
  likes: number;

  @Prop({ default: 0 }) // Số lượng lượt thích  
  dislikes: number;

  @Prop({type: Types.ObjectId, ref: 'Comment', required: true}) // Mảng để lưu các comment
  comments:Types.ObjectId;

  @Prop({ default: true }) // Trạng thái bài viết có đang hoạt động hay không
  isActive: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
