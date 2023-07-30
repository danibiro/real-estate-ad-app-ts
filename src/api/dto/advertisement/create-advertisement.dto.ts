import { AutoMap } from "@automapper/classes";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

export default class CreateAdvertisementDto {
  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  description: string;

  @AutoMap()
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  address: string;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @AutoMap()
  @IsNotEmpty()
  @IsDateString()
  dateOfCreation: Date;

  @AutoMap()
  @IsNotEmpty()
  @IsBoolean()
  negotiable: boolean;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  area: number;

  @AutoMap()
  @IsNotEmpty()
  @IsNumber()
  agentId: number;
}
