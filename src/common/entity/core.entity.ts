import { Field, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//GraphQL의 Entity는 InputType, ArgsType, ObjectType 3가지 타입 중 하나를 갖는다.
//하나의 Entity에 2가지 이상의 타입 데코레이터를 사용하게 되면 오류가 발생
//isAbstract라는 option을 사용하면 된다. - 다른 entity에서 extends 하여 사용할 때 문제

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  updatedAt: Date;
}
