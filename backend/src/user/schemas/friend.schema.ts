
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Friend extends Document {
    @Prop({ type: String, ref: 'User', required: true })
    sender: string;
  
    @Prop({ type: String, ref: 'User', required: true })
    receiver: string;
  
    @Prop({ required: true })
    status: string ;
}

export const FriendSchema = SchemaFactory.createForClass(Friend)