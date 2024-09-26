import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    unique: [
      true,
      'The phone number has been created, please try with another number',
    ],
  })
  numberPhone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  gender: boolean; //true is male, false is female

  @Prop()
  birthday: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  friends: Types.ObjectId[];

  @Prop({type: Types.ObjectId, ref:'FriendRequest'})
  friendsRequest: Types.ObjectId[]

  @Prop()
  avatar: string;

  @Prop()
  follows: string;

  @Prop()
  post: string;

  @Prop({ default: false })
  role: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
