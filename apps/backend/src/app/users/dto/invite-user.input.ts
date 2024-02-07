import {InputType, Field} from '@nestjs/graphql';
import {AccessLevels} from '@prisma/client';
import {IsEmail, Length, Matches} from 'class-validator';

@InputType()
export class InviteUserInput {
  @Field(() => String, {description: 'User email address'})
  @IsEmail()
  email: string;

  @Field(() => String, {description: 'User first name'})
  @Length(3, 50)
  name: string;

  @Field(() => String, {description: 'User surname'})
  @Length(3, 50)
  surname: string;

  @Field(() => String, {description: 'User company ID'})
  @Length(3, 50)
  companyId: string;

  @Field(() => String, {description: 'User phone number'})
  @Length(3, 50)
  phoneNumber: string;

  @Field(() => String, {description: 'User access level'})
  @Length(3, 50)
  @Matches(
    `^${Object.values(AccessLevels)
      .filter(v => typeof v !== 'number')
      .join('|')}$`,
    'i'
  )
  accessLevel: string;

  @Field(() => String, {description: 'User job description'})
  @Length(3, 50)
  jobDescription: string;
}
