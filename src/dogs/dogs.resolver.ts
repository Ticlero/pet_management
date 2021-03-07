import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dtos/create.dog';
import { UpdateDogDto } from './dtos/update.dog';
import { DogEntity } from './entities/dog.entity';
@Resolver()
export class DogsResolver {
  constructor(private readonly dogsService: DogsService) {}

  @Query((returns) => [DogEntity])
  getAllDogs(): Promise<DogEntity[]> {
    return this.dogsService.getAllDogs();
  }

  @Mutation(() => Boolean)
  async createDog(@Args('input') createDog: CreateDogDto): Promise<boolean> {
    try {
      const test = await this.dogsService.createDog(createDog);
      console.log(test, typeof test);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
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
