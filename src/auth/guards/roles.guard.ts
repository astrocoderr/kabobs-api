import {
  CanActivate, ExecutionContext, HttpException, HttpStatus,
  Inject, Injectable, UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';


@Injectable()
export class RolesGuard implements CanActivate{
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try{
      const required_roles = this.reflector.getAllAndOverride<string[]>(
        this.configService.get('ROLES.KEY'), [
          context.getHandler(),
          context.getClass()
        ]
      )

      if(!required_roles){
        return true
      }

      const auth_header = req.headers.authorization;
      const bearer = auth_header.split(' ')[0];
      const token = auth_header.split(' ')[1];

      if(bearer != this.configService.get('JWT.BEARER') || !token){
        this.logger.error(
          `Error in roles.guard.ts - 'canActivate()'. Bearer or Token is undefined`
        );
        throw new UnauthorizedException({
          success: false,
          message: `User unauthorized`,
          result: {}
        });
      }

      req.user = this.jwtService.verify(token);

      return req.user.role.some(role => required_roles.includes(role.name));
    }catch(ex){
      this.logger.error(
        `Error in roles.guard.ts - 'canActivate()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: `Forbidden`,
        result: {}
      }, HttpStatus.FORBIDDEN);
    }
  }
}