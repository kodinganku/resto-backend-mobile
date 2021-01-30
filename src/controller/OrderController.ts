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
import { OrderRepository, InvoiceRepository } from "../database/repository";
import { Customer } from "../database/entity";
import { getCustomerUser } from "../lib/auth";

@JsonController("/order")
export class OrderController {
  @Authorized("CUSTOMER")
  @Get("/my_order")
  async getAllMyOrder(@CurrentUser({ required: true }) customer: Customer) {
    const orderRepos = await getCustomRepository(OrderRepository);
    const orders = await orderRepos.find({ where: { ord_customer: customer.cst_id }, relations: ["ord_discount"] });
    return orders;
  }


}
