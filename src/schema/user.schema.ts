import {
  prop,
  getModelForClass,
  pre,
  ReturnModelType,
  QueryMethod,
  index,
} from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import argon from 'argon2';

//find by email
function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}
//query added to find
interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>('save', async function () {
  if (!this.isModified('password')) return;
  const hash = await argon.hash(this.password);
  this.password = hash;
})
//indexing on email
@index({ email: 1 })
//find by email method added
@QueryMethod(findByEmail)
@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
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
@InputType()
export class UserLoginInput {
  @Field(() => String)
  @prop({ required: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
