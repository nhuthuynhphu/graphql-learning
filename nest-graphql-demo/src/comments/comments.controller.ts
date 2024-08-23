import { Controller, Sse } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Sse('sse')
  sse(): Observable<any> {
    return this.commentsService.commentAdded$.pipe(
      map((comment) => ({
        data: comment,
      })),
    );
  }
}
