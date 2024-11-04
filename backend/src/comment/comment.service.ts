
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.schema';
import { promises } from 'dns';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/schemas/user.schemas';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(Comment.name) private readonly UserModel: Model<User>,
    private cloudinaryService: CloudinaryService,
    private jwtService: JwtService
  ) {}

  //tạo cmt lần đầu
  async create(userId: string, postId: string, commentDto: CommentDto, files? : Express.Multer.File[]): Promise<Comment> {
    const newCmt = new this.commentModel({
      content: commentDto.content,
      author: userId,
      post: postId,
      likes : [],
    });
    if (files && files.length > 0){
      try {
        const uploadImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
        newCmt.img = uploadImages;
      } catch (error) {
        console.error('Error upload images to cloudinary', error)
        throw new HttpException('Filed to upload images please try again', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
      return await newCmt.save()
  }


  //tìm tất cả cmt có trên web
  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().populate('author', 'firstName lastName').exec();
  }


  //tìm 1 cmt theo obj của cmt
  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel.findById(id).populate('author', 'firstName lastName').exec();
    if (!comment) {
      throw new NotFoundException(`Bình luận có ID "${id}" không tồn tại`);
    }
    return comment;
  }

  //tìm tòn bộ cmt có trong post
  async findByPostId(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).populate('author', 'firstName lastName').exec();
  }


  //
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

