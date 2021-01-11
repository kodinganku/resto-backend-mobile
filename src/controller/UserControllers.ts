import { JsonController, Param, Body, Get, Post, Put, Delete, QueryParam } from "routing-controllers";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { UserRepository } from "../database/repository/UserRepository";

@JsonController("/user")
export class UserController {
  @Get("/")
  async getAll() {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return users;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    //id automatic cast to number
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new GenericError(404, "No user found");
    }

    return user;
  }

  @Get("/:id/role")
  getOneWithRole(@Param("id") id: number, @QueryParam("byrole") byRole: string) {
    return {
      message: `Get user id ${id} with Role ${byRole}`,
    };
  }

  @Post("/")
  async post(@Body() userData: any) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.createAndSave(
      userData.username,
      userData.email,
      userData.password,
      userData.address
    );
    if (!user) {
      throw new GenericError(400, "User has exist");
    }
    return { id: user.id, email: user.email };
  }

  @Put("/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
