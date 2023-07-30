import Advertisement from "src/domain/entity/advertisement.entity";
import { DynamicModule } from "@nestjs/common";
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import Agent from "src/domain/entity/agent.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

class TypeOrmConfigClass {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: configService.get("db.host"),
      port: configService.get("db.port"),
      username: configService.get("db.username"),
      password: configService.get("db.password"),
      database: configService.get("db.database"),
      entities: [Advertisement, Agent],
      synchronize: true,
    };
  }
}

const TypeOrmConfigAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return TypeOrmConfigClass.getOrmConfig(configService);
  },
  inject: [ConfigService],
};

const TypeOrmConfig: DynamicModule = TypeOrmModule.forRootAsync(
  TypeOrmConfigAsyncOptions,
);

export default TypeOrmConfig;
