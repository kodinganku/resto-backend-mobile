import { JsonController, Param, Body, Res, Get, Post, Put, Delete, QueryParam } from "routing-controllers";
import { Response } from "express";
import { getCustomRepository } from "typeorm";
import { GenericError } from "../lib/utils";
import { generateRefreshToken, verifyGoogleToken, getAuthResponse } from "../lib/auth";

import { CustomerRepository } from "../database/repository/";
@JsonController("/auth")
export class AuthController {
  @Post("/")
  async authenticate(@Body() credential: any, @Res() res: Response) {
    //check customer registered or not in db
    if (credential.token === "" || credential.token === null) {
      throw new GenericError(400, "Token Required");
    }
    if (credential.fcm_token === "" || credential.fcm_token === null) {
      throw new GenericError(400, "FCM Token device required");
    }

    try {
      const ticket = await verifyGoogleToken(credential.token);

      const data = ticket.getPayload();

      const authResponse = await getAuthResponse(data || "", credential);

      const [refresh, expire_refresh] = generateRefreshToken({ email: authResponse.customer.cst_email }, res);
      Object.assign(authResponse, { refreshToken: { refresh, expires_at: expire_refresh } });
      return authResponse;
    } catch (error) {
      throw new GenericError(400, error.message || "Invalid Token");
    }
  }
}
