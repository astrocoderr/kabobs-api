import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { RedisCacheModule } from '../redis/redis.module';
import { RedisService } from "../redis/services/redis.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: Number(process.env.EXPIRES_IN)
      }
    }),
    RedisCacheModule,
    UsersModule,
  ]
})
export class AuthModule {}
