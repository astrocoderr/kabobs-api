import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

const getDurationInMilliseconds = function(start){
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const start_time = process.hrtime()
    const start = Date.now()

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    response
      .status(status)
      .json({
        success: false,
        message,
        result: {},
        time: {
          start: start,
          finish: Date.now(),
          duration: getDurationInMilliseconds(start_time),
          server_time: new Date()
        }
      });
  }
}