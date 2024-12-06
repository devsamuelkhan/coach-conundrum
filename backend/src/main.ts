import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { json, urlencoded } from "express";
import * as admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { patchNestJsSwagger } from "nestjs-zod";
import { AppModule } from "./app.module";
import { EntityNotFoundErrorFilter } from "./common/filters/entity-notfound.filter";
import { HttpErrorFilter } from "./common/filters/http-error.filter";
import { QueryFailedErrorFilter } from "./common/filters/unique-voilation-error.filter";
import { setupSwagger } from "./swagger";

async function startServer() {
  try {

    const app = await NestFactory.create(AppModule);

    // Middleware
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ limit: "50mb", extended: true }));

    // Validation Pipeline
    app.useGlobalPipes(new ValidationPipe());

    // Filters
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new HttpErrorFilter());
    app.useGlobalFilters(new QueryFailedErrorFilter(httpAdapter));
    app.useGlobalFilters(new EntityNotFoundErrorFilter());

    // Cross-Origin
    app.enableCors();

    // Zod Schema in Swagger
    patchNestJsSwagger();

    // Swagger
    setupSwagger(app);

    // Listening on the specified port
    await app.listen(process.env.PORT || 3001).then(() => {
      Logger.log(`
 ##################################################
      ****************************************
            Server Running on Port ${process.env.PORT || 3001}
      ****************************************
 ##################################################
   `);
    });
  } catch (error) {
    Logger.error(error, "Server Initialization Failed");
  }
}
startServer();
