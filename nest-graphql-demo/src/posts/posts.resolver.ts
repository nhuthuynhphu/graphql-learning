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
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [Post])
  posts(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('title', { type: () => String, nullable: true }) title?: string,
  ) {
    const offset = (page - 1) * limit;
    return this.postsService.findAll(title).slice(offset, offset + limit);
  }

  @Query(() => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
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

  @ResolveField(() => [Comment])
  comments(@Parent() post: Post) {
    return this.postsService.getCommentsForPost(post.id);
  }
}
