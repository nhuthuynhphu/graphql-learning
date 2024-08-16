import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { User } from '../users/user.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(() => Post)
  createPost(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.postsService.createPost(userId, title, content);
  }

  @ResolveField(() => User)
  author(@Parent() post: Post) {
    return post.author;
  }
}
