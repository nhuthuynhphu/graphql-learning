import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => [Comment], { nullable: 'itemsAndList' })
  comments?: Comment[];
}
