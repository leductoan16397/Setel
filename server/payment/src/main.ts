import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from 'core/config/config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const appConfig: ConfigService = new ConfigService();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        retryAttempts: 5,
        retryDelay: 3000,
        url: `redis://${appConfig.redisDomain}:6379`,
      },
    },
  );
  await app.listen();
}
bootstrap();
