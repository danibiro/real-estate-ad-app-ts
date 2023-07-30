import { AgentModule } from "./agent.module";
import { forwardRef, Module } from "@nestjs/common";
import { AdvertisementService } from "../domain/service/advertisement.service";
import { AdvertisementController } from "../api/controller/advertisement.controller";
import Advertisement from "src/domain/entity/advertisement.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement]),
    forwardRef(() => AgentModule),
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
