import {
  CanActivate, ExecutionContext, Inject, Injectable,
  UnauthorizedException
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
        this.logger.error(`Error in jwt-auth.guard.ts - Bearer or Token is undefined`);
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }

      req.user = this.jwtService.verify(token);

      return true;
    }catch(ex){
      this.logger.error(`Error in jwt-auth.guard.ts - ${ex}`);
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}