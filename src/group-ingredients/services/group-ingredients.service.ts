import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { GroupIngredient } from '../models/group-ingredients.model';
import { CreateGroupIngredientDto } from '../dto/create-group-ingredient.dto';
import { UpdateGroupIngredientDto } from '../dto/update-group-ingredient.dto';


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
      const groupIngredient = await this.groupIngredientModel.create(dto)

      // const newGroupIngredient = await this.groupIngredientModel.findByPk(groupIngredient.id)

      return {
        success: true,
        message: 'Group ingredient created successfully',
        data: {
          groupIngredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'createGroupIngredient()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting group ingredients
  async getGroupIngredients(){
    try{
      const groupIngredients = await this.groupIngredientModel.findAll({ where: { active: true } });

      return {
        success: true,
        message: 'Group ingredients fetched successfully',
        data: {
          groupIngredients
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'getGroupIngredients()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a group ingredient
  async getGroupIngredient(id: number){
    try{
      const groupIngredient = await this.groupIngredientModel.findByPk(id);

      if(!groupIngredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'getGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Group ingredient fetched successfully',
        data: {
          groupIngredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'getGroupIngredient()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a group ingredient
  async modifyGroupIngredient(id: number, dto: UpdateGroupIngredientDto){
    try{
      const groupIngredient = await this.groupIngredientModel.update(dto,{
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
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!groupIngredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'modifyGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newGroupIngredient = await this.groupIngredientModel.findByPk(groupIngredient.id)

      return {
        success: true,
        message: 'Group ingredient modified successfully',
        data: {
          groupIngredient: newGroupIngredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'modifyGroupIngredient()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a group ingredient
  async removeGroupIngredient(id: number){
    try{
      const groupIngredient = await this.groupIngredientModel.update({ active: false },{
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

      if(!groupIngredient){
        this.logger.error(
          `Error in group-ingredient.service.ts - 'removeGroupIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Group ingredient removed successfully',
        data: {
          groupIngredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in group-ingredient.service.ts - 'removeGroupIngredient()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
