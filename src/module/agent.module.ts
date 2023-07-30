import { AdvertisementModule } from "./advertisement.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { forwardRef, Module } from "@nestjs/common";
import { AgentService } from "src/domain/service/agent.service";
import { AgentController } from "../api/controller/agent.controller";
import Agent from "src/domain/entity/agent.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent]),
    forwardRef(() => AdvertisementModule),
  ],
  controllers: [AgentController],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
