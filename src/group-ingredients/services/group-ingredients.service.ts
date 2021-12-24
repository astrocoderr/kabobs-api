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

      return await this.groupIngredientModel.findByPk(groupIngredient.id)
    }catch(ex){
      this.logger.error(`Error in group-ingredient.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting group ingredients
  async getGroupIngredients(){
    return await this.groupIngredientModel.findAll({ where: { active: true } });
  }

  // Getting a group ingredient
  async getGroupIngredient(id: number){
    return await this.groupIngredientModel.findByPk(id);
  }

  // Editing a group ingredient
  async modifyGroupIngredient(id: number, dto: UpdateGroupIngredientDto){
    const groupIngredient = await this.groupIngredientModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in group-ingredient.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!groupIngredient){
      this.logger.error(`Error in group-ingredient.service.ts - 'groupIngredient' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.groupIngredientModel.findByPk(groupIngredient.id)
  }

  // Removing a group ingredient
  async removeGroupIngredient(id: number){
    const groupIngredient = await this.groupIngredientModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in group-ingredient.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!groupIngredient){
      this.logger.error(`Error in group-ingredient.service.ts - 'groupIngredient' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return groupIngredient
  }
}
