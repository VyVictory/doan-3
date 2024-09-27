import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import {CommentDto} from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // API để tạo một comment mới
  @Post()
  async create(@Body() createCommentDto: CommentDto) {
    return await this.commentService.create(createCommentDto);
  }

  // API để lấy tất cả các comment
  @Get()
  async findAll() {
    return await this.commentService.findAll();
  }

  // API để lấy một comment theo ID
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.commentService.findById(id);
  }

  // API để xóa một comment theo ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id);
  }

  // API để cập nhật một comment theo ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() createCommentDto: CommentDto) {
    return await this.commentService.update(id, createCommentDto);
  }
}

