import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DogEntity } from 'src/dogs/entities/dog.entity';

@ObjectType()
export class PetListViewOutput extends CoreOutput {
  @Field((type) => [DogEntity])
  dog?: DogEntity[];
}
