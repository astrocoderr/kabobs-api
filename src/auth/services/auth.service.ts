import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }


  // Validate User Credentials
  private async validateUser(dto: AuthDto){
    const user = await this.userService.getUserByEmail(dto.email)

    if(!user){
      throw new UnauthorizedException({ message: 'Email is not correct' })
    }

    const password = await bcrypt.compare(dto.password, user.password)

    if(!password){
      throw new UnauthorizedException({ message: 'Password is not correct' })
    }

    return user
  }

  // Generate Token For User
  private async generateToken(user: User){
    const payload = { email: user.email, id: user.id }

    const token = this.jwtService.sign(payload)
    await this.redisService.set(token, { hello: 'world' })

    return {
      token
    }
  }

}
