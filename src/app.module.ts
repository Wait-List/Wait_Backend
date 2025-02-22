import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./domain/user/user.module";
import { ListModule } from "./domain/list/list.module";
import { TokenModule } from "./global/jwt/jwt.module";
import { AuthModule } from "./global/auth/auth.module";
import { HttpExceptionFilter } from "./global/error/http-exception-filter";
import { APP_FILTER } from "@nestjs/core";

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
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
