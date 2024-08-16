import { Injectable } from '@nestjs/common';
import { Post } from './posts.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(private readonly usersService: UsersService) {}

  findAll(): Post[] {
    return this.posts;
  }

  findByUser(userId: number): Post[] {
    return this.posts.filter((post) => post.author.id === userId);
  }

  createPost(userId: number, title: string, content: string): Post {
    const user = this.usersService.findOne(userId);
    const post = {
      id: Math.floor(Math.random() * 10000) + 1,
      title,
      content,
      author: user,
    };
    this.posts.push(post);
    return post;
  }
}
