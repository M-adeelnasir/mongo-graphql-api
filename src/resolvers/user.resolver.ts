import { User, UserRegisterInput } from '../schema/user.schema';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { UserService } from '../service/user.service';

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
    try {
      const user = await this.userService.createUser(input);
      console.log(user);
      return user;
    } catch (err) {
      console.log(err);

      return null;
    }
  }
}
