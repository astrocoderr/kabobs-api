import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { GroupIngredient } from '../models/group-ingredients.model';
import { CreateGroupIngredientDto } from '../dto/create-group-ingredient.dto';
import { UpdateGroupIngredientDto } from '../dto/update-group-ingredient.dto';
import { GetGroupIngredientsDto } from '../dto/get-group-ingredients.dto';


@Injectable()
export class GroupIngredientsService {
  constructor(
    @InjectModel(GroupIngredient) private groupIngredientModel: typeof GroupIngredient,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a group ingredient
  async createGroupIngredient(dto: CreateGroupIngredientDto){
    try{
      const group_ingredient = await this.groupIngredientModel.create(dto)

      // const newGroupIngredient = await this.groupIngredientModel.findByPk(groupIngredient.id)

      return {
        success: true,
        message: 'Group ingredient created successfully',
        result: {
          group_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'createGroupIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting group ingredients
  async getGroupIngredients(dto: GetGroupIngredientsDto){
    try{
      const group_ingredients = await this.groupIngredientModel.findAll({
        where: { active: true },
        offset: (dto.page - 1) * dto.limit,
        limit: dto.limit
      });

      return {
        success: true,
        message: 'Group ingredients fetched successfully',
        result: {
          group_ingredients
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'getGroupIngredients()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a group ingredient
  async getGroupIngredient(id: number){
    try{
      const group_ingredient = await this.groupIngredientModel.findByPk(id);

      if(!group_ingredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'getGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Group ingredient fetched successfully',
        result: {
          group_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'getGroupIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a group ingredient
  async modifyGroupIngredient(id: number, dto: UpdateGroupIngredientDto){
    try{
      const group_ingredient = await this.groupIngredientModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in group-ingredient.service.ts - 'modifyGroupIngredient()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!group_ingredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'modifyGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_group_ingredient = await this.groupIngredientModel.findByPk(group_ingredient.id)

      return {
        success: true,
        message: 'Group ingredient modified successfully',
        result: {
          group_ingredient: new_group_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'modifyGroupIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a group ingredient
  async removeGroupIngredient(id: number){
    try{
      const group_ingredient = await this.groupIngredientModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in group-ingredient.service.ts - 'removeGroupIngredient()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!group_ingredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'removeGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Group ingredient removed successfully',
        result: {
          group_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'removeGroupIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
