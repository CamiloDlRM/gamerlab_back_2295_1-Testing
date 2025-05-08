import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  
  // Este `listen` no es necesario para funciones serverless, pero puedes dejarlo para propósitos locales
  const port = process.env.PORT ?? 3000;
  server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}
bootstrap();
