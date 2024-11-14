
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true,
})
export class Message extends Document{

    @Prop({ type: Types.ObjectId, ref: 'User'})
    SenderId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User'})
    receiverId: Types.ObjectId;

    @Prop()
    content: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message)