import { Response } from 'express';
import { UserLoginInput, UserModel } from '../schema/user.schema';
import { UserRegisterInput } from '../schema/user.schema';
import argon from 'argon2';
import { jwtSign } from '../utils/jwt';
import { ApolloError } from 'apollo-server';

export class UserService {
  async createUser(input: UserRegisterInput) {
    const user = await UserModel.create(input);
    return user;
  }

  async loginUser(input: UserLoginInput, res: Response) {
    const { email, password } = input;

    const user = await UserModel.find().findByEmail(email).lean();

    if (!user) {
      throw new ApolloError('Invalid credentials');
    }

    const isMatch = await argon.verify(user.password, password);

    if (!isMatch) {
      throw new ApolloError('Invalid credentials');
    }

    const token = await jwtSign({ email: user.email, _id: user.email });

    res.cookie('accessToken', token, {
      maxAge: 3.154e10, //1year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    return token;
  }
}
