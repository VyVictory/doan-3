import { IsEnum, IsOptional, IsString, IsArray, IsNotEmpty } from "class-validator"
import { Types } from "mongoose";



export class CreateGroupDto{

    @IsNotEmpty()
    @IsArray()
    readonly members?: Types.ObjectId[];

    @IsNotEmpty()
    @IsString()
    readonly groupName: string;
    
}