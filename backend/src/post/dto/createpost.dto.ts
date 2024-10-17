import { IsOptional, IsString } from "class-validator"



export class CreatePostDto{

    @IsOptional()
    @IsString()
    readonly content: string

    @IsOptional()
    @IsString()
    readonly img?:string[]
}