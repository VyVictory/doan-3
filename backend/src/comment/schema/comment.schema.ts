import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true, // Tự động thêm createdAt và updatedAt
})
export class Comment extends Document {
  @Prop({ required: true })
  content: string; // Nội dung bình luận

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Liên kết tới User
  author: Types.ObjectId; // ID của tác giả bình luận

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true }) // Liên kết tới Post
  post: Types.ObjectId; // ID của bài viết mà bình luận này thuộc về

  @Prop({ default: true }) // Trạng thái bình luận có đang hoạt động hay không
  isActive: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
