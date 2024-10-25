import { IsEnum, IsOptional, IsString, IsArray } from "class-validator"
import { Types } from "mongoose";



export class CreatePostDto{

    @IsOptional()
    @IsString()
    readonly content: string

    @IsOptional()
    @IsString()
    readonly img?:string[]

    @IsOptional()
    @IsEnum(['public', 'friends', 'private', 'specific'])
    readonly privacy: string;
  
    @IsOptional()
    @IsArray()
    readonly allowedUsers?: Types.ObjectId[];
    
}