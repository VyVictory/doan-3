
// src/schemas/groupMessage.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

@Schema({
    timestamps: true
  })

export class Group extends Document {

    @Prop()
    name: string;

    @Prop()
    avatarGroup : string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    owner : User;

    @Prop({ type: [{type: Types.ObjectId, ref: 'User'}] })
    participants: User[];

    @Prop()
    numberMember : number;

}

export const GroupSchema = SchemaFactory.createForClass(Group);