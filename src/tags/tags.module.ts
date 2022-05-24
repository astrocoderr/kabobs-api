import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { AuthModule } from '../auth/auth.module';
import { Tag } from './models/tags.model';


@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    SequelizeModule.forFeature([
      Tag
    ]),
    AuthModule
  ],
  exports: [
    TagsModule,
    TagsService
  ],
})

export class TagsModule {}
