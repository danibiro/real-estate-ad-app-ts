import { AutoMap } from "@automapper/classes";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Agent from "./agent.entity";
import BaseEntity from "./base.entity";

@Entity("real_estate_ad")
export default class Advertisement extends BaseEntity {
  @AutoMap()
  @Column("varchar", { length: 40 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 40)
  title: string;

  @AutoMap()
  @Column("varchar", { length: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  description: string;

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
  price: number;

  @AutoMap()
  @Column("date", { name: "date_of_creation", nullable: false })
  @IsNotEmpty()
  @IsDateString()
  dateOfCreation: Date;

  @AutoMap()
  @Column("boolean", { default: false })
  @IsNotEmpty()
  @IsBoolean()
  negotiable: boolean;

  @AutoMap()
  @Column("integer")
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  area: number;

  @AutoMap()
  @ManyToOne(() => Agent, (agent) => agent.advertisements)
  @JoinColumn({ name: "agent_id" })
  @IsNotEmptyObject()
  agent: Agent;
}
