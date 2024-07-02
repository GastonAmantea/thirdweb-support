import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from 'config';
import * as bodyParser from 'body-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, { bufferLogs: true });
  const port: number = PORT;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Web3 Builder Swagger')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  app.useLogger(app.get(Logger));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port, () => {
    console.log('[WEB]', `http://localhost:${PORT}`);
  });
}
bootstrap();
