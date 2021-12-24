import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { Ingredient } from '../models/ingredients.model';
import { CreateIngerdientDto } from '../dto/create-ingerdient.dto';
import { UpdateIngredientDto } from '../dto/update-ingredient.dto';


@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient) private ingredientModel: typeof Ingredient,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating an ingredient
  async createIngredient(dto: CreateIngerdientDto){
    try{
      const ingredient = await this.ingredientModel.create(dto)

      return await this.ingredientModel.findByPk(ingredient.id)
    }catch(ex){
      this.logger.error(`Error in ingredient.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting ingredients
  async getIngredients(){
    return await this.ingredientModel.findAll({ where: { active: true } });
  }

  // Getting an ingredient
  async getIngredient(id: number){
    return await this.ingredientModel.findByPk(id);
  }

  // Editing a ingredient
  async modifyIngredient(id: number, dto: UpdateIngredientDto){
    const ingredient = await this.ingredientModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in ingredient.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!ingredient){
      this.logger.error(`Error in ingredient.service.ts - 'ingredient' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.ingredientModel.findByPk(ingredient.id)
  }

  // Removing an ingredient
  async removeIngredient(id: number){
    const ingredient = await this.ingredientModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in ingredient.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!ingredient){
      this.logger.error(`Error in ingredient.service.ts - 'ingredient' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return ingredient
  }
}
