import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdvertisementModule } from "./module/advertisement.module";
import TypeOrmConfig from "./config/typeorm.config";
import { DataSource } from "typeorm";
import { AgentModule } from "./module/agent.module";
import yamlConfig from "./config/yaml.config";

@Module({
  imports: [
    AdvertisementModule,
    TypeOrmConfig,
    AgentModule,
    ConfigModule.forRoot({
      load: [yamlConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
