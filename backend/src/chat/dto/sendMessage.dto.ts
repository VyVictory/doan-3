import { IsEnum, IsOptional, IsString, IsArray, IsNotEmpty, ValidateIf } from "class-validator"
import { Types } from "mongoose";



export class SendMessageDto{

    @ValidateIf((o) => !o.content) 
    @IsArray()
    readonly content?: string

    @ValidateIf((o) => !o.img) 
    @IsString()
    readonly img?: string;

    @ValidateIf((o) => !o.video)
    @IsString()
    readonly video?: string;
    
}