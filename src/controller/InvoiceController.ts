import {
  JsonController,
  Param,
  BodyParam,
  Get,
  Post,
  Put,
  Delete,
  QueryParams,
  Authorized,
  CurrentUser,
} from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { OrderRepository, InvoiceRepository } from "../database/repository";
import { Customer } from "../database/entity";
import { IsNumber, IsOptional, IsString } from "class-validator";

class GetInvoicesQuery {
  @IsNumber()
  @IsOptional()
  order_id: number;
}

@JsonController("/invoice")
export class InvoiceController {
  @Authorized("CUSTOMER")
  @Get("/my_invoice")
  async getAllInvoice(@QueryParams() query: GetInvoicesQuery, @CurrentUser({ required: true }) customer: Customer) {
    const invoiceRepos = await getCustomRepository(InvoiceRepository);
    let filterQuery = { inv_customer: customer.cst_id };
    if (query.order_id) {
      filterQuery["inv_order"] = query.order_id;
    }
    const invoices = await invoiceRepos.find({
      where: filterQuery,
      relations: ["inv_paygateway"],
    });
    return invoices;
  }
}
