import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  user_id: string;

  @Field((type) => String)
  @Column()
  @IsString()
  user_pwd: string;

  @Field((type) => String, { defaultValue: Date.now().toString() })
  @Column({ default: Date.now().toString() })
  created: string;
}
