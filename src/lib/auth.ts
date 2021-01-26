import { Action } from "routing-controllers";
import jwt, { Secret } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

import { getCustomRepository } from "typeorm";
import { CustomerRepository } from "../database/repository/CustomerRepository";

const authSecret = process.env.AUTH_TOKEN_SECRET as Secret;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const generateToken = (data: object, secret: Secret, expiresIn: number): [string, Date] => {
  const now = new Date();
  const token = jwt.sign(data, secret, { expiresIn });
  now.setTime(now.getTime() + expiresIn * 1000);
  return [token, now];
};

const verifyToken = (token: string, secret: Secret): any => {
  return jwt.verify(token, secret);
};

const verifyAuthToken = (token: string) => {
  return verifyToken(token.split(" ")[1], authSecret);
};
const generateAuthToken = (data: object) => {
  return generateToken(data, authSecret, 3600); // 1 hour
};

const generateRefreshToken = (data: object, res: Response) => {
  const [token, expiry] = generateToken(data, refreshSecret, 30 * 24 * 3600); // 30 days
  res.cookie("refreshToken", token, {
    httpOnly: true,
    expires: expiry,
    secure: false,
    sameSite: "lax",
  });
};

const verifyGoogleToken = async (token: string) => {
  const ticket = await googleAuthClient.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  return ticket;
};

const getCustomerUser = async (payload: any) => {
  //some query to repository to get customer data by email
  const customerRepository = getCustomRepository(CustomerRepository);
  let customer = await customerRepository.findOne({
    where: { cst_email: payload.email },
  });
  if (customer == null) {
    customer = await customerRepository.createAndSave(payload.name, payload.email, "RANDOM NEED CHANGE FROM DEVICE");
  }
  return {
    ...customer,
    roles: ["CUSTOMER"],
  };
};

const getAuthResponse = async (payload: any) => {
  const customer = await getCustomerUser(payload);
  const [token, tokenExpiry] = generateAuthToken(customer);
  return {
    customer,
    token,
    expires_at: tokenExpiry.getTime(),
  };
};

const currentUserChecker = async (action: Action) => {
  const token = action.request.headers["authorization"];
  try {
    const credential_data = verifyAuthToken(token);
    const custRepo = getCustomRepository(CustomerRepository);
    const customer = await custRepo.findOne({ where: { cst_id: credential_data.cst_id } });
    return customer;
  } catch (err) {
    return null;
  }
};

const authorizationChecker = async (action: Action, roles: string[]) => {
  try {
    const token = action.request.headers["authorization"];
    const credential_data = verifyAuthToken(token); //verify first the token, if not valid catch
    const custRepo = getCustomRepository(CustomerRepository);
    const customer = await custRepo.findOne({ where: { cst_id: credential_data.cst_id } });
    if (customer && !roles.length) return true;
    if (customer && roles.find(role => credential_data.roles.indexOf(role) !== -1)) return true;
    return false; //condition when not valid
  } catch (err) {
    return false;
  }
};

export {
  currentUserChecker,
  authorizationChecker,
  generateToken,
  generateAuthToken,
  verifyAuthToken,
  generateRefreshToken,
  getCustomerUser,
  verifyGoogleToken,
  getAuthResponse,
};
