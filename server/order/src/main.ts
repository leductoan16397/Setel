import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'core/config/config.service';
import { ExceptionFactory } from 'core/exception/exceptionFactory';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: ConfigService = app.get(ConfigService);

  // ennable CORS
  app.enableCors();

  // register validatiion Pipe (validate input)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: ExceptionFactory,
    }),
  );
  const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      url: `redis://${appConfig.redisDomain}:6379`,
    },
  });

  await app.startAllMicroservices();
  await app.listen(appConfig.orderPort, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
