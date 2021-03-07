import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dtos/create.user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserEntity])
  async getAllUser(): Promise<UserEntity[]> {
    try {
      return await this.userService.getAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => Boolean)
  async createUser(@Args('input') createUser: CreateUserDto): Promise<boolean> {
    console.log(createUser);
    try {
      const test = await this.userService.createUser(createUser);
      console.log(test);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
