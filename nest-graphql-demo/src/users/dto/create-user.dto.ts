import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, MinLength, Min, Max } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;
}
