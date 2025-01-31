import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./domain/user/user.module";
import { ListModule } from "./domain/list/list.module";
import { TokenModule } from "./global/jwt/jwt.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      synchronize: Boolean(true),
    }),
    UserModule,
    ListModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
