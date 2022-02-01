import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PermissionsService],
  controllers: [PermissionsController],
  imports: [
    AuthModule
  ]
})
export class PermissionsModule {}
