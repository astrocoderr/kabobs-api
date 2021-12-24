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
      const techcard = await this.techcardModel.create(dto)

      // ingredientID
      const ingredient = await this.ingredientService.getIngredient(dto.ingredient)

      if(ingredient){
        await techcard.$set('ingredient', [ingredient.id])
      }else {
        this.logger.error(`Error in techcard.service.ts - 'ingredient' is not found`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      }

      return await this.techcardModel.findByPk(techcard.id, { include: { all: true } })
    }catch(ex){
      this.logger.error(`Error in techcard.service.ts - '${ex}'`);
      throw new HttpException('BadGateway', HttpStatus.BAD_GATEWAY);
    }
  }

  // Getting techcards
  async getTechcards(){
    return await this.techcardModel.findAll({
      where: { active: true },
      include: { all: true }
    });
  }

  // Getting a techcard
  async getTechcard(id: number){
    return await this.techcardModel.findByPk(id, { include: { all: true } });
  }

  // Searching a techcard(s)
  async searchTechcard(dto: SearchTechcardDto){
    return await this.techcardModel.findAll({
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
  }

  // Editing a techcard
  async modifyTechcard(id: number, dto: UpdateTechcardDto){
    const techcard = await this.techcardModel.update(dto,{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in techcard.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!techcard){
      this.logger.error(`Error in techcard.service.ts - 'techcard' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return await this.techcardModel.findByPk(techcard.id, { include: { all: true } })
  }

  // Removing a techcard
  async removeTechcard(id: number){
    const techcard = await this.techcardModel.update({ active: false },{
      where: { id },
      returning: true
    })
      .then(newData => {
        return newData[1][0]
      })
      .catch(error => {
        this.logger.error(`Error in techcard.service.ts - '${error}'`);
        throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
      })

    if(!techcard){
      this.logger.error(`Error in techcard.service.ts - 'techcard' is not found`);
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }

    return techcard
  }
}
