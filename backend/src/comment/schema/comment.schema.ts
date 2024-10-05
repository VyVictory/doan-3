import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { validate } from 'class-validator';

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

  // @Prop({ required: true }) // không cần vì mỗi object của mongodb đều có id riêng
  // commendId: string; // ID của bình luận 

  @Prop({ default: true }) // Trạng thái bình luận có đang hoạt động hay không
  isActive: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] }) // Liên kết tới Comment (tự liên kết để tạo cây bình luận)
  replyTo : Types.ObjectId; // Danh sách các bình luận phản hồi (nếu có)

  @Prop({ default: 0 }) // Số lượng lượt thích của bình luận
  likes: number;

  // @Prop({ type: [String], validate: [validate, 'Invalid media type'] })
  // media: string[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
