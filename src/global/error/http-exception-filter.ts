import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    const status = exception.getStatus();

    res.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.name,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
