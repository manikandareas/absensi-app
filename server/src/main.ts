import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    .setGlobalPrefix('api')
    .enableCors({
      origin: ['http://localhost:3000'],
    });

  await app.listen(config.serverPort, () =>
    console.log(`server started 🚀 on port ${config.serverPort}`),
  );
}
bootstrap();
