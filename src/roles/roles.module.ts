import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';
import { Role } from './models/roles.model';
import { UserRolesAssociations } from './models/user-roles-associations.model';
import { AuthModule } from '../auth/auth.module';


@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([ Role, UserRolesAssociations ]),
    AuthModule
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
