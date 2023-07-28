import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "config/config.service";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  if (!config.isDevEnv) app.set("trust proxy", 1);

  await app.listen(config.get("port"));
}

void bootstrap();
