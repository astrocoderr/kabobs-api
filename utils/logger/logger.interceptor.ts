import {
  Injectable, NestInterceptor, ExecutionContext,
  Logger, CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggerInterceptor implements NestInterceptor{
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    if(this.configService.get('ENVIRONMENT') !== this.configService.get('PROD_ENV')){
      const { ip, method, url } = context.switchToHttp().getRequest();
      const userAgent = context.switchToHttp().getRequest().headers['user-agent'];

      Logger.log(
        `${method} ${url} - ${userAgent} ${ip}`,
        context.getClass().name,
      )
    }

    return next.handle()
  }
}