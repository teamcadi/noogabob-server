import express from "express";
import server from "./server";
import swaggerUI from "swagger-ui-express";
import { logger } from "./utils/logger";
import swagger from "../swagger.json";
import config from "./configs";

const app = express();
const env = config.nodeEnv || "development";
const hostname = env == "development" ? "localhost" : config.hostname;

// api 문서
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger, { explorer: true }));

logger.info(`API DOCS -> http://${hostname}:${config.port}/api-docs`);

/**
 * @authors 남태우:7th | 박해미:7th | 임태호:7th
 * @host cadi 000.000.000.000
 * @description 반려견의 식사와 간식 제공 정보를 가족 구성원과 공유하는 서비스입니다.
 *
 * @period 2020-12-01 ~
 * @api https://documenter.getpostman.com/view/70398/S1M3uQSL?version=latest
 * @github https://github.com/teamcadi/noogabob-server
 */
server(app);
