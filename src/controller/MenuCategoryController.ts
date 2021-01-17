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
} from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { MenuCategoryRepository } from "../database/repository";
import { MenuCategory } from "../database/entity/";

@JsonController("/menu_category")
@Authorized("CUSTOMER")
export class MenuCategoryController {
  @Get("/")
  async getAllCategory() {
    const menuCategRepos = await getCustomRepository(MenuCategoryRepository);
    return await menuCategRepos.find();
  }

  @Get("/:id")
  async getOneCategory(@Param("id") id: number) {
    const menuCategRepos = await getCustomRepository(MenuCategoryRepository);
    return await menuCategRepos.findOne({ where: { mnc_id: id }, relations: ["mnc_menus"] });
  }
}
