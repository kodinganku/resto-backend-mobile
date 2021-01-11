import { JsonController, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { CustomerRepository } from "../database/repository/CustomerRepository";

@JsonController("/profile")
export class ProfileController {
  @Get("/")
  @Authorized()
  getProfile() {
    return {
      status: "OK",
    };
  }
}
