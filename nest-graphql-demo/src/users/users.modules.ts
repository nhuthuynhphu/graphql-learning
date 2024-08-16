import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PostsModule } from '../posts/posts.module';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [forwardRef(() => PostsModule)],
  exports: [UsersService],
})
export class UsersModule {}
