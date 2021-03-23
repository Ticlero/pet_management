import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entity/core.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class DogEntity extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 20)
  dog_name: string;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  dog_age: number;

  @Field((type) => String)
  @Column()
  @IsString()
  breed: string;

  @Field((type) => UserEntity)
  @ManyToOne((type) => UserEntity, (user) => user.dogs)
  user: UserEntity;
}
