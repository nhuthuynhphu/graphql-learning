import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => CommentsModule)],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
