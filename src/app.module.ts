import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DB,
      entities: [__dirname + "/../**/*.entity.{js,ts}"],
      synchronize: Boolean(true),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
