import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  QueryParam,
  Authorized,
  CurrentUser,
  QueryParams,
} from "routing-controllers";
import { Between, getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { MenuRepository } from "../database/repository";
import { Menu } from "../database/entity";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

class QueryFilterMenu {
  @IsNumber()
  @IsOptional()
  category?: number;

  @IsNumber()
  @IsOptional()
  price_start?: number = 0;

  @IsNumber()
  @IsOptional()
  price_end?: number = 0;

  @IsBoolean()
  @IsOptional()
  is_favorite?: boolean;

  @IsNumber()
  offset: number = 0;

  @IsNumber()
  limit: number = 10;
}

@JsonController("/menu")
@Authorized("CUSTOMER")
export class MenuController {
  @Get("/")
  async getAllMenu(@QueryParams() query: QueryFilterMenu) {
    const menuRepos = await getCustomRepository(MenuRepository);
    let filterQuery = {};
    if (query.category) {
      filterQuery["mnu_category"] = query.category;
    }
    if (query.price_end || query.price_start) {
      if (query.price_end == 0) {
        query.price_end = Number.MAX_VALUE;
      }
      filterQuery["mnu_price"] = Between(query.price_start, query.price_end);
    }
    if (query.is_favorite) {
      /* TODO implement filter by favorite menu of logged in user*/
    }

    return await menuRepos.find({
      order: { mnu_name: "ASC" },
      where: filterQuery,
      skip: query.offset,
      take: query.limit,
    });
  }

  @Get("/:id")
  async getOneCategory(@Param("id") id: number) {
    const menuRepos = await getCustomRepository(MenuRepository);
    return await menuRepos.findOne({ where: { mnu_id: id }, relations: ["mnu_category", "mnu_additionals"] });
  }
}
