import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JsonApiInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) return data;

        if (Array.isArray(data)) {
          return {
            data: data.map((item) => ({
              type: 'products',
              id: item.id.toString(),
              attributes: { ...item, id: undefined },
            })),
          };
        }

        return {
          data: {
            type: 'products',
            id: data.id?.toString(),
            attributes: { ...data, id: undefined },
          },
        };
      }),
    );
  }
}
