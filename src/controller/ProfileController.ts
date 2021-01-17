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
import { IsNotEmpty, IsMobilePhone, IsNumber, IsISO8601, IsEnum, IsInt, IsOptional } from "class-validator";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { CustomerRepository } from "../database/repository/";
import { Customer } from "../database/entity/Customer";

enum Gender {
  Female = 0,
  Male = 1,
}
class CustomerUpdate {
  @IsNotEmpty()
  cst_name: string;

  @IsMobilePhone("id-ID") //enable only for indonesian number phone
  cst_phone: string;

  @IsOptional()
  @IsISO8601()
  cst_birthday: string;

  @IsOptional()
  @IsEnum(Gender, {
    message: "The allowed value only 0 or 1",
  })
  cst_gender: Gender;

  @IsOptional()
  cst_address: string;
}

@JsonController("/profile")
@Authorized("CUSTOMER")
export class ProfileController {
  @Get("/")
  getMyProfile(@CurrentUser({ required: true }) customer: Customer) {
    return customer;
  }

  @Put("/")
  async updateMyProfile(@Body() updateData: CustomerUpdate, @CurrentUser({ required: true }) customer: Customer) {
    const customerRepos = await getCustomRepository(CustomerRepository);
    const updateCustomer = await customerRepos.updateProfile(updateData, customer);
    if (updateCustomer == null) {
      throw new GenericError(400, "Failed to update data");
    }
    return updateCustomer;
  }
}
