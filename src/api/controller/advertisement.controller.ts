import { AgentService } from "./../../domain/service/agent.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  NotFoundException,
  Inject,
  Put,
} from "@nestjs/common";
import mapper from "src/domain/mapper/mapper";
import Advertisement from "src/domain/entity/advertisement.entity";
import { AdvertisementService } from "../../domain/service/advertisement.service";
import CreateAdvertisementDto from "../dto/advertisement/create-advertisement.dto";
import Agent from "src/domain/entity/agent.entity";
import { ConfigService } from "@nestjs/config";

@Controller("ads")
export class AdvertisementController {
  private readonly logger = new Logger(AdvertisementController.name);

  constructor(
    private readonly advertisementService: AdvertisementService,
    @Inject(AgentService) private readonly agentService: AgentService,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    this.logger.log("AdvertisementController.create");
    const agent: Agent | null = await this.agentService.findOne(
      createAdvertisementDto.agentId,
    );

    if (agent === null) {
      this.logger.error("AdvertisementController.create: invalid");
      throw new NotFoundException("Agent not found");
    }
    this.logger.log("AdvertisementController.create: valid");

    const advertisement: Advertisement = mapper.map(
      createAdvertisementDto,
      CreateAdvertisementDto,
      Advertisement,
    );
    advertisement.agent = agent;
    return this.advertisementService.create(advertisement);
  }

  @Get()
  async findAll() {
    this.logger.log("AdvertisementController.findAll");
    return this.advertisementService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    this.logger.log("AdvertisementController.findOne");
    const advertisement: Advertisement | null =
      await this.advertisementService.findOne(+id);
    if (advertisement === null) {
      this.logger.error("AdvertisementController.findOne: not found");
      throw new NotFoundException("Advertisement not found");
    }
    this.logger.log("AdvertisementController.findOne: found");
    return advertisement;
  }

  @Get("agent/:id")
  async findAllByAgent(@Param("id") id: string) {
    this.logger.log("AdvertisementController.findAllByAgent");
    return this.advertisementService.findAllByAgentId(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() createAdvertisementDto: CreateAdvertisementDto,
  ) {
    this.logger.log("AdvertisementController.update");
    const defaultAd: Advertisement | null =
      await this.advertisementService.findOne(+id);
    if (defaultAd === null) {
      this.logger.error("AdvertisementController.update: not found");
      throw new NotFoundException("Advertisement not found");
    }
    const agent: Agent | null = await this.agentService.findOne(
      createAdvertisementDto.agentId,
    );
    if (agent === null) {
      this.logger.error("AdvertisementController.update: invalid");
      throw new NotFoundException("Agent not found");
    }
    this.logger.log("AdvertisementController.update: valid");
    const advertisement: Advertisement = mapper.map(
      createAdvertisementDto,
      CreateAdvertisementDto,
      Advertisement,
    );
    advertisement.agent = agent;
    return this.advertisementService.update(+id, advertisement);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    this.logger.log("AdvertisementController.remove");
    return this.advertisementService.remove(+id);
  }
}
