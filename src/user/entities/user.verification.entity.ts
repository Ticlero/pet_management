import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entity/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class VerificationsEntity extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  @Field((type) => UserEntity)
  user: UserEntity;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
