import {
  CanActivate, ExecutionContext, Inject, Injectable,
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
      const auth_header = req.headers.authorization;
      const bearer = auth_header.split(' ')[0];
      const token = auth_header.split(' ')[1];

      if(bearer != this.configService.get('JWT.BEARER') || !token){
        this.logger.error(`Error in jwt-auth.guard.ts - 'canActivate()'. Bearer or Token undefined`);
        throw new UnauthorizedException({
          success: false,
          message: `User unauthorized`,
          result: {}
        });
      }

      req.user = this.jwtService.verify(token);

      return true;
    }catch(ex){
      this.logger.error(`Error in jwt-auth.guard.ts - 'canActivate()'. ${ex.message}. ${ex.original}`);
      throw new UnauthorizedException({
        success: false,
        message: `User unauthorized`,
        result: {}
      });
    }
  }
}