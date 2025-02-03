import { IsNotEmpty, IsDateString, IsString } from "class-validator";
import { Type } from "class-transformer";

export class ListRequest {
  @IsString({ message: "내용은 문자열이어야 합니다." })
  @IsNotEmpty()
  content: string;

  @IsDateString({}, { message: "날짜는 'YYYY-MM-DD' 형식이어야 합니다." })
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;
}
