import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schemas';
import { CreatePostDto } from './dto/createpost.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { settingPrivacyDto } from './dto/settingPrivacy.dto'; 
import { UpdatePostDto } from './dto/updatePost.dto';
import { Exception } from 'handlebars';

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private PostModel: Model<Post>,
        @InjectModel(User.name) private UserModel: Model<User>,
        private cloudinaryService: CloudinaryService,
        private jwtService: JwtService
    ){}



    async createPost(createPostDto: CreatePostDto, userId: string, files?: Express.Multer.File[]): Promise<Post> {
        const newPost = new this.PostModel({
            content: createPostDto.content,
            author: userId,
            privacy: createPostDto.privacy,
            allowedUsers: createPostDto.allowedUsers,
            likes: [],
            dislikes: [],
            isActive: true,
        });
        if (files && files.length > 0) {
            try {
                
                const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
                newPost.img = uploadedImages; 
            } catch (error) {
                console.error('Error uploading images to Cloudinary:', error);
                throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        return await newPost.save(); 
    }


    async updatePost(postId: string, updatePostDto: UpdatePostDto, userId: string, files?: Express.Multer.File[]): Promise<Post> {
        const post = await this.PostModel.findById(postId);

        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        if (post.author.toString() !== userId) {
            throw new HttpException('You are not authorized to update this post', HttpStatus.UNAUTHORIZED);
        }            
            post.content = updatePostDto.content || post.content;
            if (files && files.length > 0) {
                try {
                    const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
                    post.img = uploadedImages; // Thay thế hình ảnh cũ
                } catch (error) {
                    console.error('Error uploading images to Cloudinary:', error);
                    throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        return await post.save();
}

    async deletePost(postId: string, userId: string): Promise<{ message: string }> {
        const post = await this.PostModel.findById(postId);

        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }

        if (post.author.toString() !== userId) {
            throw new HttpException('You are not authorized to delete this post', HttpStatus.UNAUTHORIZED);
        }
        await this.PostModel.findByIdAndDelete(postId);

        return { message: 'Post deleted successfully' };
    }

    async settingPrivacy(postId: string, settingPrivacyDto: settingPrivacyDto, userId: string): Promise<Post> {
        try {
            const post = await this.PostModel.findById(postId);

            if (!post) {
                throw new HttpException('The post does not exist', HttpStatus.NOT_FOUND);
            }

            // check var côi author có = userid 0 
            if (post.author.toString() !== userId) {
                throw new HttpException('You are not authorized to update this post', HttpStatus.UNAUTHORIZED);
            }
    
            // nếu cập nhật prvacy là specific nhưng 0 nhập list user thì trả về lỗi
            if (settingPrivacyDto.privacy === 'specific' && (!settingPrivacyDto.allowedUsers || settingPrivacyDto.allowedUsers.length === 0)) {
                throw new HttpException('Allowed users must be provided for specific privacy', HttpStatus.BAD_REQUEST);
            }
            post.privacy = settingPrivacyDto.privacy;
            if (settingPrivacyDto.privacy === 'specific') {
                post.allowedUsers = settingPrivacyDto.allowedUsers;
            } else {
                post.allowedUsers = [];
            }
            return await post.save();
        } catch (error) {
            // Bắt lỗi và ném lại lỗi dưới dạng HttpException nếu có lỗi
            console.error('Error updating post privacy:', error);
            throw new HttpException(
                error.message || 'An error occurred while updating post privacy',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findPostCurrentUser(userId:string){
        try {
            const userPosts  = await this.PostModel.find({author: userId}).exec();
            return userPosts
        } catch (error) {
            console.error('errol', error)
            throw new HttpException('Could not retrieve posts', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    
}
