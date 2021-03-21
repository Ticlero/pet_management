import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { VerificationsEntity } from '../entities/user.verification.entity';

@ObjectType()
export class VerificationEmailOutput extends CoreOutput {}

@InputType()
export class VerificationEmailInput extends PickType(
  VerificationsEntity,
  ['code'],
  InputType,
) {}
