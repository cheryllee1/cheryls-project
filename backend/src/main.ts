import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // This is needed because the frontend runs on a different port
    cors: true,
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService);
  if (!config.isDevEnv) {
    app.set('trust proxy', 1);
  }

  await app.listen(config.get('port'));
}

void bootstrap();
