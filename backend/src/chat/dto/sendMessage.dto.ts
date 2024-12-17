import { IsEnum, IsOptional, IsString, IsArray, IsNotEmpty, ValidateIf } from "class-validator"
import { Types } from "mongoose";



export class SendMessageDto{

    // @IsNotEmpty()
    // readonly group: Types.ObjectId;

    @ValidateIf((o) => !o.content) 
    readonly content?: string

    @ValidateIf((o) => !o.mediaURL) 
    @IsString()
    readonly mediaURL?: string;
    
}