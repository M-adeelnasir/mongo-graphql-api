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

  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async register(@Arg('input') input: UserRegisterInput): Promise<User | null> {
    const user = await this.userService.createUser(input);
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
