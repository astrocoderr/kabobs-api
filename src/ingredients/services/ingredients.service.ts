import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Ingredient } from '../models/ingredients.model';
import { CreateIngerdientDto } from '../dto/create-ingerdient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';
import { GroupIngredientsService } from '../../group-ingredients/services/group-ingredients.service';
import { GetIngredientsDto } from '../dto/get-ingredients.dto';


@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient) private ingredientModel: typeof Ingredient,
    private groupIngredientService: GroupIngredientsService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating an ingredient
  async createIngredient(dto: CreateIngerdientDto){
    try{

      const group_ingredient = await this.groupIngredientService.getGroupIngredient(dto.group_id)

      if(!group_ingredient.success){
        this.logger.error(
          `Error in ingredient.service.ts - 'craeteIngredient()'. Group ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Group ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const ingredient = await this.ingredientModel.create(dto)

      await ingredient.$set('group', [group_ingredient.result.group_ingredient.id])

      const new_ingredient = await this.ingredientModel.findByPk(ingredient.id, { include: { all: true } })

      return {
        success: true,
        message: 'Ingredient created successfully',
        result: {
          ingredient: new_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in ingredient.service.ts - 'craeteIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting ingredients
  async getIngredients(dto: GetIngredientsDto){
    try{
      const ingredients = await this.ingredientModel.findAll(
        {
          where: { active: true },
          include: { all: true },
          offset: (dto.page - 1) * dto.limit,
          limit: dto.limit
        }
      );

      return {
        success: true,
        message: 'Ingredients fetched successfully',
        result: {
          ingredients
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in ingredient.service.ts - 'getIngredients()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting an ingredient
  async getIngredient(id: number){
    try{
      const ingredient = await this.ingredientModel.findByPk(id, { include: { all: true }});

      if(!ingredient){
        this.logger.error(
          `Error in ingredient.service.ts - 'getIngredient()'. Ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Ingredient fetched successfully',
        result: {
          ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in ingredient.service.ts - 'getIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a ingredient
  async modifyIngredient(id: number, dto: UpdateIngredientDto){
    try{
      const ingredient = await this.ingredientModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in ingredient.service.ts - 'modifyIngredient()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!ingredient){
        this.logger.error(
          `Error in ingredient.service.ts - 'modifyIngredient()'. Ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_ingredient = await this.ingredientModel.findByPk(ingredient.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Ingredient modified successfully',
        result: {
          ingredient: new_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in ingredient.service.ts - 'modifyIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing an ingredient
  async removeIngredient(id: number){
    try{
      const ingredient = await this.ingredientModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in ingredient.service.ts - 'removeIngredient()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            result: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!ingredient){
        this.logger.error(
          `Error in ingredient.service.ts - 'removeIngredient()'. Ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Ingredient not found`,
          result: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const new_ingredient = await this.ingredientModel.findByPk(ingredient.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Ingredient removed successfully',
        result: {
          ingredient: new_ingredient
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in ingredient.service.ts - 'removeIngredient()'. ${ex.message}. ${ex.original}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        result: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
