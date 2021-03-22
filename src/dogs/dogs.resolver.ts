import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/user/entities/user.entity';
import { DogsService } from './dogs.service';
import { CreateDogDto, CreateDogOutput } from './dtos/create.dog';
import { UpdateDogDto } from './dtos/update.dog';
import { DogEntity } from './entities/dog.entity';
@Resolver()
export class DogsResolver {
  constructor(private readonly dogsService: DogsService) {}

  @Query((returns) => [DogEntity])
  getAllDogs(): Promise<DogEntity[]> {
    return this.dogsService.getAllDogs();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CreateDogOutput)
  async createDog(
    @AuthUser() authUser: UserEntity,
    @Args('input') createDog: CreateDogDto,
  ): Promise<CreateDogOutput> {
    return this.dogsService.createDog(authUser, createDog);
  }

  @Mutation(() => Boolean)
  async updateDog(@Args('input') updateDog: UpdateDogDto) {
    try {
      await this.dogsService.updateDog(updateDog);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
