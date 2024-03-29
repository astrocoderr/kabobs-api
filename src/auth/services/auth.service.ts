import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { AuthDto } from '../dto/auth.dto';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/models/user.model';
import { RedisService } from '../../redis/services/redis.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Authorization
  async signin(dto: AuthDto) {
    try{
      const user = await this.validateUser(dto)

      const token = await this.generateToken(user)
      // const resfreshToken = await this.generateRefreshToken(token)

      return {
        success: true,
        message: 'User authorized successfully',
        result: {
          token,
          user
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in auth.service.ts - 'signin()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_REQUEST);
    }
  }


  // Validate User Credentials
  private async validateUser(dto: AuthDto){
    const user = await this.userService.getUserByEmail(dto.email)

    if(!user.success){
      this.logger.error(
        `Error in auth.service.ts - 'validateUser()'. User not found`
      );
      throw new HttpException({
        success: false,
        message: `User not found`,
        result: {}
      }, HttpStatus.BAD_REQUEST);
    }

    const password = await bcrypt.compare(dto.password, user.result.user.password)

    if(!password){
      this.logger.error(
        `Error in auth.service.ts - 'validateUser()'. Password not found`
      );
      throw new HttpException({
        success: false,
        message: `Password not found`,
        result: {}
      }, HttpStatus.BAD_REQUEST);
    }

    return user.result.user
  }

  // Generate token for user
  private async generateToken(user: User){
    const payload = { email: user.email, id: user.id }

    try{
      const token = this.jwtService.sign(payload)
      await this.redisService.set(token, { user })

      if(!token){
        this.logger.error(
          `Error in auth.service.ts - 'generateToken()'. Token not found`
        );
        throw new HttpException({
          success: false,
          message: `Token not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return token
    }catch(ex){
      this.logger.error(
        `Error in auth.service.ts - 'generateToken()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: `Token error`,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Generate refresh token for user
  private async generateRefreshToken(token: string){
    const payload = { token }

    try{
      const refreshToken = this.jwtService.sign(payload)
      await this.redisService.set(token, { token })

      if(!refreshToken){
        this.logger.error(
          `Error in auth.service.ts - 'generateToken()'. Refresh token not found`
        );
        throw new HttpException({
          success: false,
          message: `Refresh token not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        refreshToken
      }
    }catch(ex){
      this.logger.error(
        `Error in auth.service.ts - 'generateRefreshToken()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: `Refresh token error`,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
