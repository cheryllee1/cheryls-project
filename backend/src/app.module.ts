import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "api.module";
import { ConfigModule } from "config/config.module";
import { ConfigService } from "config/config.service";
import { DatabaseConfigService } from "database/database-config.service";
import { Response } from "express";
import { HelmetMiddleware } from "middlewares/helmet.middleware";
import { join } from "path";

const FRONTEND_PATH = join(__dirname, "..", "..", "frontend", "build");

@Module({
  imports: [
    ApiModule,
    ConfigModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: DatabaseConfigService,
    }),

    ServeStaticModule.forRoot({
      rootPath: FRONTEND_PATH,
      exclude: ["/api*"], // Return 404 for non-existent API routes
      serveStaticOptions: {
        maxAge: 2 * 60 * 60 * 1000, // 2 hours, same as cloudflare
        setHeaders: function (res: Response, path: string) {
          // set maxAge to 0 for root index.html
          if (path === join(FRONTEND_PATH, "index.html")) {
            res.setHeader("Cache-control", "public, max-age=0");
          }
        },
      },
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HelmetMiddleware).forRoutes("*");
  }
}
