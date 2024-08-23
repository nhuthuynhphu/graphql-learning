import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comment])
  comments() {
    return this.commentsService.findAll();
  }

  @Mutation(() => Comment)
  createComment(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('postId', { type: () => Int }) postId: number,
    @Args('content') content: string,
  ) {
    return this.commentsService.createComment(userId, postId, content);
  }

  @ResolveField(() => User)
  author(@Parent() comment: Comment) {
    return comment.author;
  }

  @ResolveField(() => Post)
  post(@Parent() comment: Comment) {
    return comment.post;
  }
}
