import { Field, InputType, ObjectType } from 'type-graphql';
import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { User } from './user.schema';
import { IsNumber, MaxLength, Min, MinLength } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  @prop({ ref: () => User, required: true })
  createdBy: Ref<User>;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  price: number;
}

export const ProductModel = getModelForClass<typeof Product>(Product);

@InputType()
export class CreateProductInput {
  @Field()
  @MaxLength(20, { message: 'Lenght must be less then 300' })
  @MinLength(5, { message: 'Lenght must be greater then 5' })
  title: string;

  @Field()
  createdBy: Ref<User>;

  @Field()
  @MaxLength(20, { message: 'Lenght must be less then 300' })
  @MinLength(5, { message: 'Lenght must be greater then 5' })
  description: string;

  @Field()
  @IsNumber()
  @Min(1)
  price: number;
}

@InputType()
export class GetProduct {
  @Field()
  _id: string;
}
