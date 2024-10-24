
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}

  async create(commentDto: CommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(commentDto);
    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().populate('author', 'firstName lastName').exec();
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).populate('author', 'firstName lastName').exec();
    if (!comment) {
      throw new NotFoundException(`Bình luận có ID "${id}" không tồn tại`);
    }
    return comment;
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).populate('author', 'firstName lastName').exec();
  }

  async delete(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndDelete(id).exec();
    if (!deletedComment) {
      throw new NotFoundException(`Bình luận có ID "${id}" không tồn tại`);
    }
    return deletedComment;
  }

  async update(id: string, commentDto: CommentDto): Promise<Comment> {
    const updatedComment = await this.commentModel.findByIdAndUpdate(id, commentDto, { new: true }).exec();
    if (!updatedComment) {
      throw new NotFoundException(`Bình luận có ID "${id}" không tồn tại`);
    }
    return updatedComment;
  }

  async reply(parentCommentId: string, replyDto: CommentDto): Promise<Comment> {
    const parentComment = await this.findById(parentCommentId);
    const reply = new this.commentModel({
      ...replyDto,
      replyTo: parentCommentId,
      post: parentComment.post,
    });
    return reply.save();
  }
}

