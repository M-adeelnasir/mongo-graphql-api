import { User, UserRegisterInput } from '../schema/user.schema';
import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { UserService } from '../service/user.service';
import { Context } from '../types/context';
import { UserLoginInput } from '../schema/user.schema';

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => User)
  me() {
    return {
      _id: 'ksjkjs',
      name: 'sdkjsk',
      email: 'ksjdkdls',
    };
  }

  @Mutation(() => User, { nullable: true })
  async register(@Arg('input') input: UserRegisterInput): Promise<User | null> {
    const user = await this.userService.createUser(input);
    console.log(user);
    return user;
  }

  @Mutation(() => String)
  async login(
    @Arg('input') input: UserLoginInput,
    @Ctx() ctx: Context
  ): Promise<String | null> {
    const result = await this.userService.loginUser(input, ctx.res);
    return result;
  }
}
