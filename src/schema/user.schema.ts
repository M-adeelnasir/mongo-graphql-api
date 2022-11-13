import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
export class UserRegisterInput {
  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;

  @Field(() => String)
  name: string;
}

export const UserModel = getModelForClass(User);
