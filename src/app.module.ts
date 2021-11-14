import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/roles.model';
import { UserRoles } from './roles/models/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/models/customer.model';
import { AddressesModule } from './addresses/addresses.module';
import { Addresses } from './addresses/models/addresses.model';
import { CustomerAddresses } from './addresses/models/customer-addresses.model';

import { LoggerMiddleware } from './utils/logger/logger.middleware';


@Module({
  controllers: [  ],
  providers: [  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      models: [ User, Role, UserRoles, Customer, Addresses, CustomerAddresses ],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    RedisModule,
    CustomersModule,
    AddressesModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}