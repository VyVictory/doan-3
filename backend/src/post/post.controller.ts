import { Put, Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors, } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuardD } from '../user/guard/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/createpost.dto';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { User } from '../user/schemas/user.schemas';
import { get } from 'http';

@Controller('post')
export class PostController {

    constructor(
        private postService: PostService
    ) { }

    @UseGuards(AuthGuardD)
    @Post('createPost')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    async createPost(
        @CurrentUser() currentUser: User,
        @Body() createPostDto: CreatePostDto,
        @UploadedFiles() files: { files: Express.Multer.File[] }
    ) {

        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        console.log('Current User:', currentUser);
        console.log('Uploaded Files:', files);

        return this.postService.createPost(createPostDto, currentUser._id.toString(), files.files);
    }
    @Put(':id/like')
    @UseGuards(AuthGuardD)
    async likePost(@Param('id') id: string, @CurrentUser() currentUser: User) {
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }

        return await this.postService.likePost(id, currentUser._id.toString());
    }
    @Put(':id/dislike')
    @UseGuards(AuthGuardD)
    async dislikePost(@Param('id') id: string, @CurrentUser() currentUser: User) {
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }

        return await this.postService.dislikePost(id, currentUser._id.toString());
    }

    @UseGuards(AuthGuardD)
    @Get('crpost')
    async getCurrentPost(
        @CurrentUser() currentUser: User,
    ) {
        return this.postService.findPostCurrentUser(currentUser._id.toString())
    }


}


