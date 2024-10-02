import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { AuthGuardD } from '../user/guard/auth.guard';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { User } from '../user/schemas/user.schemas';

@Controller('comments')
@UseGuards(AuthGuardD)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CommentDto, @CurrentUser() user: User) {
    return await this.commentService.create({ ...createCommentDto, author: user._id as string });  
  }

  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.commentService.findById(id);
  }

  @Get('post/:postId')
  async findByPostId(@Param('postId') postId: string) {
    return await this.commentService.findByPostId(postId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: CommentDto) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Post(':id/reply')
  async reply(@Param('id') id: string, @Body() replyDto: CommentDto, @CurrentUser() user: User) {
    return await this.commentService.reply(id, { ...replyDto, author: user._id as string });
  }
}