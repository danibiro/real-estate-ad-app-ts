import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsPositive } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export default class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "int" })
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
