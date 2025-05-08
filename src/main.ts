import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from "express";

// Crear servidor Express fuera de la función bootstrap
const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Añadir CORS para APIs
  await app.init();
}

// Iniciar la aplicación
bootstrap();

// Exportar el servidor Express para Vercel
export default server;
