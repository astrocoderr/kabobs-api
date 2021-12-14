import {
  CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable,
  UnauthorizedException
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
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        this.configService.get('ROLES.KEY'), [
          context.getHandler(),
          context.getClass()
        ]
      )

      if(!requiredRoles){
        return true
      }

      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if(bearer != this.configService.get('JWT.BEARER') || !token){
        this.logger.error(`Error in jwt-auth.guard.ts - Bearer or Token is undefined`);
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }

      req.user = this.jwtService.verify(token);

      return req.user.role.some(role => requiredRoles.includes(role.name));
    }catch(ex){
      this.logger.error(`Error in jwt-auth.guard.ts - ${ex}`);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}