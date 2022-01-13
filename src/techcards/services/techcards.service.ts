import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

import { Techcard } from '../models/techcards.model';
import { IngredientsService } from '../../ingredients/services/ingredients.service';
import { CreateTechcardsDto } from '../dto/create-techcards.dto';
import { SearchTechcardDto } from '../dto/search-techcard.dto';
import { UpdateTechcardDto } from '../dto/update-techcard-dto';


@Injectable()
export class TechcardsService {
  constructor(
    @InjectModel(Techcard) private techcardModel: typeof Techcard,
    private configService: ConfigService,
    private ingredientService: IngredientsService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  // Creating a techcard
  async createTechcard(dto: CreateTechcardsDto){
    try{
      // ingredientID
      const ingredient = await this.ingredientService.getIngredient(dto.ingredient)

      if(!ingredient.success){
        this.logger.error(
          `Error in techcards.service.ts - 'createTechcard()'. Ingredient not found`
        );
        throw new HttpException({
          success: false,
          message: `Ingredient not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const techcard = await this.techcardModel.create(dto)

      await techcard.$set('ingredient', [ingredient.data.ingredient.id])

      const newTechcard = await this.techcardModel.findByPk(techcard.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Techcard created successfully',
        data: {
          techcard: newTechcard
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'createTechcard()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting techcards
  async getTechcards(){
    try{
      const techcards = await this.techcardModel.findAll({
        where: { active: true },
        include: { all: true }
      });

      return {
        success: true,
        message: 'Techcards fetched successfully',
        data: {
          techcards
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'getTechcards()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting a techcard
  async getTechcard(id: number){
    try{
      const techcard = await this.techcardModel.findByPk(id, { include: { all: true } });

      if(!techcard){
        this.logger.error(
          `Error in techcards.service.ts - 'getTechcard()'. Techcard not found`
        );
        throw new HttpException({
          success: false,
          message: `Techcard not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      return {
        success: true,
        message: 'Techcard fetched successfully',
        data: {
          techcard
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'getTechcard()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Searching a techcard(s)
  async searchTechcard(dto: SearchTechcardDto){
    try{
      const techcards = await this.techcardModel.findAll({
        where: {
          [Op.or]: [
            { type: dto.search },
            { title: dto.search },
            { marketingTitle: dto.search },
            { description: dto.search },
            { ingredientsAmount: dto.search },
            { amount: dto.search },
            { brutto: dto.search },
            { kcal: dto.search },
            { prot: dto.search },
            { fat: dto.search },
            { carb: dto.search },
            { amountPiece: dto.search },
            { percent: dto.search }
          ]
        },
        include: { all: true }
      })

      return {
        success: true,
        message: 'Techcards searched successfully',
        data: {
          techcards
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'searchTechcard()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Editing a techcard
  async modifyTechcard(id: number, dto: UpdateTechcardDto){
    try{
      const techcard = await this.techcardModel.update(dto,{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in techcards.service.ts - 'modifyTechcard()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!techcard){
        this.logger.error(
          `Error in techcards.service.ts - 'modifyTechcard()'. Techcard not found`
        );
        throw new HttpException({
          success: false,
          message: `Techcard not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newTechcard = await this.techcardModel.findByPk(techcard.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Techcard modified successfully',
        data: {
          techcard: newTechcard
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'modifyTechcard()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }

  // Removing a techcard
  async removeTechcard(id: number){
    try{
      const techcard = await this.techcardModel.update({ active: false },{
        where: { id },
        returning: true
      })
        .then(newData => {
          return newData[1][0]
        })
        .catch(error => {
          this.logger.error(
            `Error in techcards.service.ts - 'removeTechcard()'. ${error}`
          );
          throw new HttpException({
            success: false,
            message: error,
            data: {}
          }, HttpStatus.BAD_REQUEST);
        })

      if(!techcard){
        this.logger.error(
          `Error in techcards.service.ts - 'removeTechcard()'. Techcard not found`
        );
        throw new HttpException({
          success: false,
          message: `Techcard not found`,
          data: {}
        }, HttpStatus.BAD_REQUEST);
      }

      const newTechcard = await this.techcardModel.findByPk(techcard.id, {
        include: { all: true }
      })

      return {
        success: true,
        message: 'Techcard removed successfully',
        data: {
          techcard: newTechcard
        }
      }
    }catch(ex){
      this.logger.error(
        `Error in techcards.service.ts - 'removeTechcard()'. ${ex.message}`
      );
      throw new HttpException({
        success: false,
        message: ex.message,
        data: {}
      }, HttpStatus.BAD_GATEWAY);
    }
  }
}
