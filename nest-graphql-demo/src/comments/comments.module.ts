import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { CommentsController } from './comments.controller';

@Module({
  imports: [forwardRef(() => UsersModule), forwardRef(() => PostsModule)],
  providers: [CommentsService, CommentsResolver],
  exports: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
