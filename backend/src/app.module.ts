import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ZodValidationPipe } from "nestjs-zod";
import { SlotModule } from "./app/slot/slot.module";
import { UserModule } from "./app/user/user.module";
import { databaseConfigs } from "./config/database.config";

@Module({
  imports: [
    //for .env file
    ConfigModule.forRoot(),
    //typeorm configuration
    TypeOrmModule.forRoot(databaseConfigs),

    // App Modules
    SlotModule,
    UserModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
