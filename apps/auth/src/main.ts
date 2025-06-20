import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: configService.getOrThrow('HOST'),
      port: configService.getOrThrow('TCP_PORT'),
    },
  });
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());

  // Start all microservices
  await app.startAllMicroservices();

  // If you also want HTTP server (optional)
  await app.listen(configService.getOrThrow('HTTP_PORT'));

  // If you only want microservice without HTTP
  // await app.init();
}
bootstrap();
