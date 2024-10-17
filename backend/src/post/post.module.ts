import { Module, Post } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Post' , schema: PostSchema }]),
    CloudinaryModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
