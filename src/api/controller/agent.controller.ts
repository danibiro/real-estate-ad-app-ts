import { AdvertisementService } from "./../../domain/service/advertisement.service";
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  Put,
  Inject,
  NotFoundException,
} from "@nestjs/common";
import { AgentService } from "src/domain/service/agent.service";
import { CreateAgentDto } from "../dto/agent/create-agent.dto";
import Advertisement from "src/domain/entity/advertisement.entity";
import Agent from "src/domain/entity/agent.entity";

@Controller("agents")
export class AgentController {
  private readonly logger = new Logger(AgentController.name);

  constructor(
    private readonly agentService: AgentService,
    @Inject(AdvertisementService)
    private readonly advertisementService: AdvertisementService,
  ) {}

  @Post()
  async create(@Body() createAgentDto: CreateAgentDto) {
    this.logger.log("AgentController.create");
    return this.agentService.create(createAgentDto);
  }

  @Get()
  async findAll() {
    this.logger.log("AgentController.findAll");
    return this.agentService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    this.logger.log("AgentController.findOne");
    const agent: Agent | null = await this.agentService.findOne(+id);
    if (agent === null) {
      this.logger.error("AgentController.findOne: invalid");
      throw new NotFoundException("Agent not found");
    }
    this.logger.log("AgentController.findOne: valid");
    return agent;
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() createAgentDto: CreateAgentDto,
  ) {
    this.logger.log("AgentController.update");
    const agent: Agent | null = await this.agentService.findOne(+id);
    if (agent === null) {
      this.logger.error("AgentController.update: invalid");
      throw new NotFoundException("Agent not found");
    }
    this.logger.log("AgentController.update: valid");
    return this.agentService.update(+id, createAgentDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    this.logger.log("AgentController.remove");
    const advertisements: Advertisement[] =
      await this.advertisementService.findAllByAgentId(+id);
    this.logger.log(
      "AgentController.remove: advertisements: " + advertisements,
    );
    for (const advertisement of advertisements) {
      await this.advertisementService.remove(advertisement.id);
    }
    return this.agentService.remove(+id);
  }
}
