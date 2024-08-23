import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { PubSub } from 'graphql-subscriptions';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
import { forwardRef, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    const { name, age } = createUserDto;
    const user = this.usersService.createUser(name, age);
    pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Subscription(() => User)
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }

  @ResolveField(() => [Post])
  posts(@Parent() user: User) {
    return this.postsService.findByUser(user.id);
  }
}
