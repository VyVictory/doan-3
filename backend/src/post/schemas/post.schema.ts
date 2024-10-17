import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Post extends Document {

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Liên kết tới User
  author: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] }) // Mảng lưu người đã like
  likes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] }) // Mảng lưu người đã dislike
  dislikes: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] }) // Mảng để lưu các comment
  comments: Types.ObjectId[];

  @Prop({ type: [String], default: [] }) // Mảng để lưu các URL của ảnh
  img: string[];

  @Prop({ default: true }) // Trạng thái bài viết có đang hoạt động hay không
  isActive: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
