import { Injectable } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.schema';
@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private readonly commentModel: Model<Comment>) {}
    async create(commentDto: CommentDto): Promise<Comment> {
        const createdComment = new this.commentModel(commentDto)
        return createdComment.save()
    }
    async findAll(): Promise<Comment[]> {
        return this.commentModel.find()
    }    
    async findById(id: string): Promise<Comment> {
        return this.commentModel.findById(id)
    }
    async delete(id: string): Promise<Comment> {
        return this.commentModel.findByIdAndDelete(id)
    }
    async update(id: string, commentDto: CommentDto): Promise<Comment> {
        return this.commentModel.findByIdAndUpdate(id, commentDto)
    }
}
