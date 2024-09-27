import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CommentDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly content?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly author: string;
                 
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly likes: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly media?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    readonly replyTo?: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly commentId: string;
}


