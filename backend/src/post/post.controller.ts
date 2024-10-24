import { Body, Controller, HttpException, HttpStatus, Post, Req, UploadedFiles, UseGuards,UseInterceptors,  } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuardD } from 'src/user/guard/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/createpost.dto';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { User } from '../user/schemas/user.schemas';

@Controller('post')
export class PostController {

    constructor(
        private postService : PostService
    ){}

    @UseGuards(AuthGuardD)
    @Post('createPost')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    async createPost(
    @CurrentUser() currentUser: User,
    @Body() createPostDto: CreatePostDto, 
    @UploadedFiles() files: { files: Express.Multer.File[] } // Điều chỉnh ở đây
) {
    // Kiểm tra nếu currentUser không tồn tại
    if (!currentUser) {
        throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
    }

    // Log thông tin người dùng hiện tại để kiểm tra
    console.log('Current User:', currentUser);
    console.log('Uploaded Files:', files); // Log để kiểm tra

    // Gọi phương thức tạo bài viết trong PostService
    return this.postService.createPost(createPostDto, currentUser._id.toString(), files.files); // Truyền files.files
}

}


