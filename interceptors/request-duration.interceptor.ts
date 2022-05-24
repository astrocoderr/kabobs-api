import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
}

const getDurationInMilliseconds = function(start){
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

@Injectable()
export class RequestDurationInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start_time = process.hrtime()
    const start = Date.now()

    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            ...data,
            time: {
              start: start,
              finish: Date.now(),
              duration: getDurationInMilliseconds(start_time),
              server_time: new Date()
            }
          }
        }),
      );
  }
}