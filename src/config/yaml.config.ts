import { join } from "path";
import * as yaml from "js-yaml";
import { readFileSync } from "fs";

const YAML_CONFIG_FILENAME = "config.yaml";

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), "utf8"),
  ) as Record<string, any>;
};
