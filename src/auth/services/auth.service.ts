import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { AuthDto } from '../dto/auth.dto';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/models/user.model';
import { RedisService } from '../../redis/services/redis.service';
import { RedisCacheModule } from '../../redis/redis.module';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    private redisCacheModule: RedisCacheModule
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

    // await this.redisCacheModule.onModuleInit()

    await this.redisService.set(token, { hello: 'world' })
    console.log('console+++++', await this.redisService.get(token))

    return {
      token
    }
  }

}
