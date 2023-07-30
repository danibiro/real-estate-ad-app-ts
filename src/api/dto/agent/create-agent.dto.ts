import { AutoMap } from "@automapper/classes";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export class CreateAgentDto {
  @AutoMap()
  @IsNotEmpty()
  @Length(1, 40)
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @AutoMap()
  @IsNotEmpty()
  @Length(1, 40)
  phone: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  address: string;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  age: number;
}
