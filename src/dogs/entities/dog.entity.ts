import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class DogEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 20)
  dog_name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  breed: string;

  @Field((type) => String)
  @Column()
  @IsString()
  owner: string;

  @Field((type) => String, { defaultValue: Date.now().toString() })
  @Column({ default: Date.now().toString() })
  created: string;
}
