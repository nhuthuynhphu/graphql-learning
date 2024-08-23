import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => Post)
  post: Post;
}
