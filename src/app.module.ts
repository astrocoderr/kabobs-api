import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { CustomersModule } from './customers/customers.module';
import { AddressesModule } from './addresses/addresses.module';
import { PromocodesModule } from './promocodes/promocodes.module';
import { OrdersModule } from './orders/orders.module';
import { KitchensModule } from './kitchens/kitchens.module';

import { LoggerMiddleware } from '../utils/logger/logger.middleware';
import { LoggerInterceptor } from '../utils/logger/logger.interceptor';
import { configuration } from '../config/configuration';
import { validationSchema } from '../config/validation'
import { loggerFactory } from '../utils/logger/logger.factory';
import { databaseFactory } from '../connectors/database.factory';
import { OrderDaysModule } from './order-days/order-days.module';
import { GroupIngredientsModule } from './group-ingredients/group-ingredients.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { TechcardsModule } from './techcards/techcards.module';
import { KitchenUsersModule } from './kitchen-users/kitchen-users.module';
import { RequestDurationInterceptor } from '../interceptors/request-duration.interceptor';
import { PermissionsModule } from './permissions/permissions.module';
import { TagsModule } from './tags/tags.module';


@Module({
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestDurationInterceptor
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => loggerFactory(configService),
      inject: [ConfigService]
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseFactory(configService),
      inject: [ConfigService]
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    RedisModule,
    CustomersModule,
    AddressesModule,
    PromocodesModule,
    OrdersModule,
    KitchensModule,
    OrderDaysModule,
    GroupIngredientsModule,
    IngredientsModule,
    TechcardsModule,
    KitchenUsersModule,
    PermissionsModule,
    TagsModule,
  ],
})

export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    if(this.configService.get('ENVIRONMENT') !== this.configService.get('PROD_ENV')){
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}