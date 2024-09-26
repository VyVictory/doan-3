import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Types,Document } from "mongoose";


@Schema({
    timestamps: true
})

export class Post extends Document{


}
export const PostSchema = SchemaFactory.createForClass(Post)