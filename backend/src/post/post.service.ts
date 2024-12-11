import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schemas';
import { CreatePostDto } from './dto/createpost.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { settingPrivacyDto } from './dto/settingPrivacy.dto'; 
import { UpdatePostDto } from './dto/updatePost.dto';


@Injectable()
export class PostService {
    constructor(
        @InjectModel(Post.name) private PostModel: Model<Post>,
        @InjectModel(User.name) private UserModel: Model<User>,
        private cloudinaryService: CloudinaryService,
        private jwtService: JwtService
    ){}

    async createPost(createPostDto: CreatePostDto, userId: string, files?: Express.Multer.File[]): Promise<{ userPost: User, savedPost: Post }> {
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
    
        const savedPost = await newPost.save(); 
        const userPost = await this.UserModel.findById(userId);
    
        await this.settingPrivacy(savedPost._id.toString(), {
            privacy: createPostDto.privacy,
            allowedUsers: createPostDto.allowedUsers
        }, userId);
    
        return {
            userPost,
            savedPost
        };
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
    async likePost(postId: string, userId: string): Promise<Post> {
        const post = await this.PostModel.findById(postId);
    
        if (!post) {
            throw new NotFoundException(`Bài viết có ID "${postId}" không tồn tại`);
        }
    
        if (post.likes.includes(userId)) {
            throw new HttpException('Bạn đã thích bài viết này', HttpStatus.BAD_REQUEST);
        }
    
        post.likes.push(userId);

        return await post.save();
    }
    async unlikePost(postId: string, userId: string): Promise<Post> {
        const post = await this.PostModel.findById(postId);

        if (!post) {
            throw new NotFoundException(`Bài viết có ID "${postId}" không tồn tại`);
        }
    
        if (!post.likes.includes(userId)) {
            throw new HttpException('Bạn đã không thích bài viết này', HttpStatus.BAD_REQUEST);
        }
    
        post.likes = post.likes.filter(like => like !== userId);

        return await post.save();
    }
    async dislikePost(postId: string, userId: string): Promise<Post> {
        const post = await this.PostModel.findById(postId);

        if (!post) {
            throw new NotFoundException(`Bài viết có ID "${postId}" không tồn tại`);
        }

        if (post.dislikes.includes(userId)) {
            throw new HttpException('Bạn đã không thích bài viết này', HttpStatus.BAD_REQUEST);
        }

        post.dislikes.push(userId);

        return await post.save();
    }
    async undislikePost(postId: string, userId: string): Promise<Post> {
        const post = await this.PostModel.findById(postId);
        if (!post) {
            throw new NotFoundException(`Bài viết có ID "${postId}" không tồn tại`);
        }
        if (!post.dislikes.includes(userId)) {
            throw new HttpException('Bạn đã không thích bài viết này', HttpStatus.BAD_REQUEST);
        }
        post.dislikes = post.dislikes.filter(dislike => dislike !== userId);
        return await post.save();
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
            const userPosts  = await this.PostModel.find({author: userId})
            .populate('author', 'username firstName lastName avatar')
            .exec();
            return userPosts
        } catch (error) {
            console.error('errol', error)
            throw new HttpException('Could not retrieve posts', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    // async findPostsPublicFriend(userId:string){
    //     try {
    //         const allposts = await this.PostModel.find({author: userId})
    //         .populate('author', 'username firstName lastName avatar')
    //         .exec();
    //         return allposts
    //     } catch (error) {
    //         console.error('errol', error)
    //         throw new HttpException('Could not retrieve posts', HttpStatus.INTERNAL_SERVER_ERROR)
    //     }
    // }
    async findPostPrivacy(postId: string, userId: string): Promise<Post> {
        try {
            const post = await this.PostModel.findById(postId);
            
            if (!post) {
                throw new HttpException('The post does not exist', HttpStatus.NOT_FOUND);
            }

            if (post.privacy === 'public') {
                return post;  
            }

            if (post.privacy === 'private') {
                if (post.author.toString() === userId) {
                    return post;  // Chỉ người tạo mới có thể xem
                } else {
                    throw new HttpException('You are not authorized to view this post', HttpStatus.UNAUTHORIZED);
                }
            }

            if (post.privacy === 'friend') {
                const user = await this.UserModel.findById(userId);
                if (!user) {
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                }

                const isFriend = user.friends.some(friend => friend.toString() === post.author.toString());

                if (isFriend) {
                    return post;  
                } else {
                    throw new HttpException('You are not friends with the author', HttpStatus.UNAUTHORIZED);
                }
            }

            if (post.privacy === 'specific') {
                if (post.allowedUsers.some(user => user.toString() === userId)) {
                    return post;  // Người dùng có trong danh sách allowedUsers, có thể xem
                } else {
                    throw new HttpException('You are not authorized to view this post', HttpStatus.UNAUTHORIZED);
                }
            }
  
            throw new HttpException('Invalid privacy setting', HttpStatus.BAD_REQUEST);
        } catch (error) {
            console.error('Error fetching post privacy:', error);
            throw new HttpException(
                error.message || 'An error occurred while checking post privacy',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    

    async getPostsByUser(userId: string, currentUserId: string): Promise<Post[]> {
        try {
            const posts = await this.PostModel.find({ author: userId });
    
            const filteredPosts = await Promise.all(
                posts.map(async (post) => {

                    switch (post.privacy) {
                        case 'public':
                            return post;
                        case 'private':
                            if (post.author.toString() === currentUserId) {
                                return post;
                            }
                            return null;
                        case 'friend':
                            const user = await this.UserModel.findById(currentUserId);
                            if (user.friends.map(friend => friend.toString()).includes(post.author.toString())) {
                                return post;
                            }
                            return null; 
                        case 'specific':
                            if (post.allowedUsers.map(id => id.toString()).includes(currentUserId)) {
                                return post;
                            }
                            return null; 
                        default:
                            return null; 
                    }
                })
            );
            return filteredPosts.filter((post) => post !== null);
        } catch (error) {
            console.error('Error getting posts by user:', error);
            throw new HttpException('An error occurred while fetching posts', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
