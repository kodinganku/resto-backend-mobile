require("dotenv").config();

import "reflect-metadata"; // this shim is required
import { useExpressServer } from "routing-controllers";
import loaders from "./loaders";
import { currentUserChecker, authorizationChecker } from "./lib/auth";

async function main() {
  console.log(`Running on Environtment ${process.env.NODE_ENV} 🔥`);
  console.log(`Version App : ${process.env.APP_VERSION || "none"}`);

  let express = require("express");
  let app = express();

  // creates express app, registers all controller routes and returns you express app instance
  useExpressServer(app, {
    currentUserChecker,
    authorizationChecker,
    routePrefix: "/api",
    cors: true,
    controllers: [__dirname + "/controller/*.js"], // we specify controllers we want to use
  });

  app.use("/public", express.static(__dirname + "/public"));

  try {
    await loaders(); //load all loaders
  } catch (err) {
    console.log("Failed to connect Database 🙈");
    console.error(err);
  }

  const PORT = process.env.PORT || 4000;

  // run express application
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`[LISTEN] 🚀🚀🚀 Server running on port ${PORT}`);
  });
}
main();
