import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { Subject } from 'rxjs';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];
  private commentAddedSubject = new Subject<any>();

  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  get commentAdded$() {
    return this.commentAddedSubject.asObservable();
  }

  findAll(): Comment[] {
    return this.comments;
  }

  findByPost(postId: number): Comment[] {
    return this.comments.filter((comment) => comment.post.id === postId);
  }

  createComment(userId: number, postId: number, content: string): Comment {
    const user = this.usersService.findOne(userId);
    const post = this.postsService.findOne(postId);
    const comment = {
      id: Math.floor(Math.random() * 10000) + 1,
      content,
      author: user,
      post,
    };
    this.comments.push(comment);
    this.commentAddedSubject.next(comment);
    return comment;
  }
}
