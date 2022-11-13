import { UserModel } from '..//schema/user.schema';
import { UserRegisterInput } from '..//schema/user.schema';
export class UserService {
  async createUser(input: UserRegisterInput) {
    console.log(input);

    const user = await UserModel.create(input);
    return user;
  }
}
