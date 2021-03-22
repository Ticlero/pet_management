import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { FindOperator, Repository } from 'typeorm';
import { CreateDogDto, CreateDogOutput } from './dtos/create.dog';
import { UpdateDogDto } from './dtos/update.dog';
import { DogEntity } from './entities/dog.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(DogEntity)
    private dogRepository: Repository<DogEntity>,
  ) {}

  getAllDogs() {
    return this.dogRepository.find();
  }

  async createDog(
    user: UserEntity,
    { dog_name, dog_age, breed }: CreateDogDto,
  ): Promise<CreateDogOutput> {
    try {
      const find = await this.dogRepository.find({
        where: {
          dog_name,
          user: user,
        },
      });
      if (find.length > 0) {
        return {
          ok: false,
          error: 'Already existing pet',
        };
      }
      const dog = await this.dogRepository.save(
        this.dogRepository.create({
          dog_name,
          dog_age,
          breed,
          user,
        }),
      );
      if (!dog) {
        return {
          ok: false,
          error: 'Pet ragistration failed',
        };
      }
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }

  updateDog(updateDog: UpdateDogDto) {
    return this.dogRepository.update(updateDog.id, { ...updateDog.data });
  }
}
