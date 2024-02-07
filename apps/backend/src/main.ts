/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 4000;
  await app.listen(port, "0.0.0.0");
  Logger.log(`Database URL: ${process.env.DATABASE_URL}`)
  Logger.log(`🚀 Server ready at: ${await app.getUrl()}/graphql`);
}

bootstrap();
