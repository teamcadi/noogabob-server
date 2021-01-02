import fs from "fs";
import { logger } from "../utils/logger";

/**
 * @description 필요한 디렉터리 셋팅
 */
const fsLoader = () => {
  if (!fs.existsSync("upload")) fs.mkdirSync("upload");

  logger.info("File System loaded");
};

export default fsLoader;
