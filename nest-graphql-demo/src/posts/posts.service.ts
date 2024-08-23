import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
  ) {}

  findAll(title?: string): Post[] {
    if (title) {
      return this.posts.filter((post) => post.title.indexOf(title) > -1);
    }
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
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
      comments: [],
    };
    this.posts.push(post);
    return post;
  }

  getCommentsForPost(postId: number): Comment[] {
    return this.commentsService.findByPost(postId);
  }
}
