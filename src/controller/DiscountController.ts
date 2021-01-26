import {
  JsonController,
  Param,
  BodyParam,
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
import { DiscountRepository, CustomerDiscountRepository } from "../database/repository";
import { Customer } from "../database/entity";

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

  @Post("/claim")
  async customerClaimDiscount(
    @BodyParam("code", { required: true }) discountCode: string,
    @CurrentUser({ required: true }) customer: Customer
  ) {
    const customerDiscRepos = await getCustomRepository(CustomerDiscountRepository);
    return await customerDiscRepos.claimDiscount(discountCode, customer);
  }
}
