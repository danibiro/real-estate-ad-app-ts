import Advertisement from "../entity/advertisement.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AdvertisementService {
  private readonly logger = new Logger(AdvertisementService.name);

  constructor(
    @InjectRepository(Advertisement)
    private advertisementRepository: Repository<Advertisement>,
  ) {}

  async create(advertisement: Advertisement) {
    this.logger.log("AdvertisementService.create");
    return this.advertisementRepository.save(advertisement);
  }

  async findAll() {
    this.logger.log("AdvertisementService.findAll");
    return this.advertisementRepository
      .createQueryBuilder("advertisement")
      .leftJoinAndSelect("advertisement.agent", "agent")
      .getMany();
  }

  async findAllByAgentId(id: number) {
    this.logger.log("AdvertisementService.findAllByAgentId");
    return this.advertisementRepository
      .createQueryBuilder("advertisement")
      .leftJoinAndSelect("advertisement.agent", "agent")
      .where("advertisement.agent_id = :id", { id })
      .getMany();
  }

  async findOne(id: number) {
    this.logger.log("AdvertisementService.findOne");
    return this.advertisementRepository
      .createQueryBuilder("advertisement")
      .leftJoinAndSelect("advertisement.agent", "agent")
      .where("advertisement.id = :id", { id })
      .getOne();
  }

  async update(id: number, advertisement: Advertisement) {
    this.logger.log("AdvertisementService.update");
    return this.advertisementRepository.update(+id, advertisement);
  }

  async remove(id: number) {
    this.logger.log("AdvertisementService.remove");
    return this.advertisementRepository.delete(+id);
  }
}
