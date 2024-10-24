import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schemas';
import { CreatePostDto } from './dto/createpost.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private PostModel: Model<Post>,
        @InjectModel(Post.name) private UserModel: Model<User>,
        private cloudinaryService: CloudinaryService,
        private jwtService: JwtService
    ){}



    async createPost(createPostDto: CreatePostDto, userId: string, files?: Express.Multer.File[]): Promise<Post> {
        const newPost = new this.PostModel({
            content: createPostDto.content,
            author: userId,
            likes: [],
            dislikes: [],
            isActive: true,
        });
        if (files && files.length > 0) {
            try {
                // Tải tất cả các hình ảnh lên Cloudinary
                const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
                newPost.img = uploadedImages; // Lưu đường dẫn secure_url vào img
            } catch (error) {
                console.error('Error uploading images to Cloudinary:', error);
                throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        return await newPost.save(); // Lưu bài viết
    }
    
    
    
    
}
