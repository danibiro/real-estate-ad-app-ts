import Advertisement from "./advertisement.entity";
import { Column, Entity, OneToMany } from "typeorm";
import BaseEntity from "./base.entity";
import { AutoMap } from "@automapper/classes";
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from "class-validator";

@Entity("real_estate_agent")
export default class Agent extends BaseEntity {
  @AutoMap()
  @Column("varchar", { length: 40 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  name: string;

  @AutoMap()
  @Column("varchar", { length: 40 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  email: string;

  @AutoMap()
  @Column("varchar", { length: 15 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  phone: string;

  @AutoMap()
  @Column("varchar", { length: 40 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  address: string;

  @AutoMap()
  @Column("integer")
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  age: number;

  @AutoMap()
  @OneToMany(() => Advertisement, (advertisement) => advertisement.agent)
  @IsNotEmptyObject()
  advertisements: Advertisement[];
}
