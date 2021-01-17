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
import { DiscountRepository } from "../database/repository";
import { Discount } from "../database/entity";

@JsonController("/discount")
@Authorized("CUSTOMER")
export class DiscountController {
  @Get("/")
  async getAllDiscount() {
    const discountRepos = await getCustomRepository(DiscountRepository);
    return await discountRepos.find();
  }

  @Get("/:id")
  async getOneDiscount(@Param("id") id: number) {
    const discountRepos = await getCustomRepository(DiscountRepository);
    return await discountRepos.findOne({ where: { dsc_id: id } });
  }
}
