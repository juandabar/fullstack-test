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
              type: 'inventories',
              id: item.id?.toString(),
              attributes: this.cleanAttributes(item),
            })),
          };
        }

        return {
          data: {
            type: 'inventories',
            id: data.id ? data.id.toString() : undefined,
            attributes: this.cleanAttributes(data),
          },
        };
      }),
    );
  }

  private cleanAttributes(obj: any) {
    const { id, ...rest } = obj;
    return rest;
  }

}