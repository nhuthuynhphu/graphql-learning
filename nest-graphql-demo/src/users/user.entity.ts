import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../posts/posts.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => [Post], { nullable: 'itemsAndList' })
  posts?: Post[];
}
