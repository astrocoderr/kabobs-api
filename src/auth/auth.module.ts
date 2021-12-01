import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtFactory } from './factories/jwt.factory';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import { RedisCacheModule } from '../redis/redis.module';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => jwtFactory(configService),
      inject: [ConfigService]
    }),
    RedisCacheModule,
    UsersModule,
  ]
})
export class AuthModule {}
