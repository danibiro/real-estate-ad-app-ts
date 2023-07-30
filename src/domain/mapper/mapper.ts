import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";
import CreateAdvertisementDto from "src/api/dto/advertisement/create-advertisement.dto";
import Advertisement from "../entity/advertisement.entity";

const mapper = createMapper({ strategyInitializer: classes() });

createMap(mapper, CreateAdvertisementDto, Advertisement);

export default mapper;
