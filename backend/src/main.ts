import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "config/config.service";

import { AppModule } from "./app.module";

async function bootstrap() {
  // Start the Nest Dependency Injection system, with AppModule as the root module
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // Enable CORS because the frontend is hosted on a separate domain than the API URL
    cors: true,

    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  if (!config.isDevEnv) app.set("trust proxy", 1);

  await app.listen(config.get("port"));
}

void bootstrap();
