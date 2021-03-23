import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto, CreateUserOutputDto } from './dtos/create.user.dto';
import { EditUserInput, EditUserOutput } from './dtos/edit.user.dto';
import { LoginInputDto, LoginOutput } from './dtos/login.user.dto';
import { PetListViewOutput } from './dtos/petlist.user.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/profile.user.dto';
import {
  VerificationEmailInput,
  VerificationEmailOutput,
} from './dtos/verify-emai.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => [UserEntity])
  async getAllUser(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Mutation(() => CreateUserOutputDto)
  async createUser(
    @Args('input') createUser: CreateUserDto,
  ): Promise<CreateUserOutputDto> {
    //console.log(createUser);
    return this.userService.createUser(createUser);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInputDto): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Query((returns) => UserEntity)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: UserEntity) {
    return authUser;
  }

  @Mutation((returns) => UserProfileOutput)
  @UseGuards(AuthGuard)
  async userProfile(
    @Args() { id }: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditUserOutput)
  async editProfile(
    @AuthUser() authUser: UserEntity,
    @Args('input') editUserInput: EditUserInput,
  ): Promise<EditUserOutput> {
    return this.userService.editProfile(authUser.id, editUserInput);
  }

  @Mutation((returns) => VerificationEmailOutput)
  async verify(
    @Args('input') verificationEmailInput: VerificationEmailInput,
  ): Promise<VerificationEmailOutput> {
    console.log(verificationEmailInput);
    return this.userService.verifyEmail(verificationEmailInput);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => PetListViewOutput)
  async viewMyPets(
    @AuthUser() authUser: UserEntity,
  ): Promise<PetListViewOutput> {
    return await this.userService.getMyPets(authUser);
  }
}
