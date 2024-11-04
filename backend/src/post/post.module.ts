import { Global, Module, Post } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserSchema } from 'src/user/schemas/user.schemas';


@Global()
@Module({
  imports:[
    MongooseModule.forFeature([{name: 'Post' , schema: PostSchema }, {name: 'User', schema: UserSchema}]),
    CloudinaryModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [MongooseModule, PostService],
})
export class PostModule {}
