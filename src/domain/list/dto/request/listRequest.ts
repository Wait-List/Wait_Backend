import { IsNotEmpty, IsDateString, MinDate, IsString } from "class-validator";
import { Type } from "class-transformer";

export class ListRequest {
  @IsString({ message: "내용은 문자열이어야 합니다." })
  @IsNotEmpty()
  content: string;

  @Type(() => Date)
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;
}
