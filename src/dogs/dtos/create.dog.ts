import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { DogEntity } from '../entities/dog.entity';

// @InputType()
// export class CreateDogDto extends PartialType(DogEntity, InputType) {}

@InputType()
export class CreateDogDto extends PickType(
  DogEntity,
  ['dog_name', 'dog_age', 'breed'],
  InputType,
) {}

@ObjectType()
export class CreateDogOutput extends CoreOutput {}
