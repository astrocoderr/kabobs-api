import {
  HttpException, HttpStatus, Inject, Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

import { Tag } from '../models/tags.model';
import { CreateTagsDto } from '../dto/create-tags.dto';
import { GetTagsDto } from '../dto/get-tags.dto';
import { UpdateTagsDto } from '../dto/update-tags.dto';


@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private tagModel: typeof Tag,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a tag
  async createTag(dto: CreateTagsDto){
    try{
      const tag = await this.tagModel.create(dto)

      return {
        success: true,
        message: 'Tag created successfully',
        result: {
          tag
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in tags.service.ts - 'createTag()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting tags
  async getTags(dto: GetTagsDto){
    try{
      const tags = await this.tagModel.findAndCountAll({
        where: { active: true },
        include: { all: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Tags fetched successfully',
        result: {
          tags
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in tags.service.ts - 'getTags()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a tag
  async getTag(id: number){
    try{
      const tag = await this.tagModel.findByPk(id, { include: { all: true } });

      if(!tag){
        this.logger.error(
          `Error in tags.service.ts - 'getTag()'. Tag not found`
        );
        throw new HttpException({
          success: false,
          message: `Tag not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Tag fetched successfully',
        result: {
          tag
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in tags.service.ts - 'getTag()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a tag
  async modifyTag(id: number, dto: UpdateTagsDto){
    try{
      const tag = await this.tagModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in tags.service.ts - 'modifyTag()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!tag){
        this.logger.error(
          `Error in tags.service.ts - 'modifyTag()'. Tag not found`
        );
        throw new HttpException({
          success: false,
          message: `Tag not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_tag = await this.tagModel.findByPk(tag.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Tag modified successfully',
        result: {
          tag: new_tag
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in tags.service.ts - 'modifyTag()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a tag
  async removeTag(id: number){
    try{
      const tag = await this.tagModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in tags.service.ts - 'removeTag()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!tag){
        this.logger.error(
          `Error in tags.service.ts - 'removeTag()'. Tag not found`
        );
        throw new HttpException({
          success: false,
          message: `Tag not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_tag = await this.tagModel.findByPk(tag.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Tag removed successfully',
        result: {
          tag: new_tag
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in tags.service.ts - 'removeTag()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
