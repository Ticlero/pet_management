import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto, CreateUserOutputDto } from './dtos/create.user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit.user.dto';
import { LoginInputDto, LoginOutput } from './dtos/login.user.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/profile.user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserEntity])
  async getAllUser(): Promise<UserEntity[]> {
    try {
      return this.userService.getAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation(() => CreateUserOutputDto)
  async createUser(
    @Args('input') createUser: CreateUserDto,
  ): Promise<CreateUserOutputDto> {
    //console.log(createUser);
    try {
      return this.userService.createUser(createUser);
    } catch (e) {
      return {
        error: e,
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInputDto): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (e) {
      console.log(e);
      return {
        error: e,
        ok: false,
      };
    }
  }

  @Query((returns) => UserEntity)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: UserEntity) {
    return authUser;
  }

  @Mutation((returns) => UserProfileOutput)
  @UseGuards(AuthGuard)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    try {
      const user = await this.userService.findById(userProfileInput.id);
      console.log(user);
      if (!user) {
        throw Error();
      }
      return {
        ok: true,
        user,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'User Not Found',
      };
    }
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditUserOutput)
  async editProfile(
    @AuthUser() authUser: UserEntity,
    @Args('input') editUserInput: EditUserInput,
  ): Promise<EditUserOutput> {
    try {
      const updateUser = await this.userService.editProfile(
        authUser.id,
        editUserInput,
      );
      if (updateUser) {
        return {
          ok: true,
        };
      }
      return {
        error: 'Update Faile',
        ok: false,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
