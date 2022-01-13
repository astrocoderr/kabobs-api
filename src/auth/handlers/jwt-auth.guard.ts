import {
  CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate{
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try{
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer != this.configService.get('JWT.BEARER') || !token){
        this.logger.error(`Error in jwt-auth.guard.ts - 'canActivate()'. Bearer or Token undefined`);
        throw new UnauthorizedException({
          success: false,
          message: `User unauthorized`,
          data: {}
        });
      }

      req.user = this.jwtService.verify(token);

      return true;
    }catch(ex){
      this.logger.error(`Error in jwt-auth.guard.ts - ${ex.message}`);
      throw new UnauthorizedException({
        success: false,
        message: `User unauthorized`,
        data: {}
      });
    }
  }
}