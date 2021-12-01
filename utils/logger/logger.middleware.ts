import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const now = Date.now()

    response.on('finish', () => {
      const { statusCode, statusMessage,  } = response;
      const contentLength = response.get('content-length');

      const errorResponse = {
        code: statusCode,
        timestamp: new Date().toLocaleDateString(),
        path: originalUrl,
        method: method,
        message: statusMessage
      };

      statusCode >= 400 ?
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} +${Date.now()-now}ms`,
          JSON.stringify(errorResponse),

        ) :
        this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} +${Date.now()-now}ms`,
        )
    });

    next();
  }
}