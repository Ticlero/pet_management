import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDogDto } from './dtos/create.dog';
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

  createDog(createDog: CreateDogDto): Promise<DogEntity> {
    const newDog = this.dogRepository.create(createDog);
    return this.dogRepository.save(newDog);
  }

  updateDog(updateDog: UpdateDogDto) {
    return this.dogRepository.update(updateDog.id, { ...updateDog.data });
  }
}
