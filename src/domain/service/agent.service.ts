import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAgentDto } from "src/api/dto/agent/create-agent.dto";
import { Repository } from "typeorm";
import Agent from "../entity/agent.entity";

@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}

  async create(createAgentDto: CreateAgentDto) {
    this.logger.log("AgentService.create");
    return this.agentRepository.save(createAgentDto);
  }

  async findAll() {
    this.logger.log("AgentService.findAll");
    return this.agentRepository.find();
  }

  async findOne(id: number) {
    this.logger.log("AgentService.findOne");
    return this.agentRepository.findOneBy({ id });
  }

  async update(id: number, createAgentDto: CreateAgentDto) {
    this.logger.log("AgentService.update");
    return this.agentRepository.update(+id, createAgentDto);
  }

  async remove(id: number) {
    this.logger.log("AgentService.remove");
    return this.agentRepository.delete(+id);
  }
}
