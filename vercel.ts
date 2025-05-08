import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express from "express";

// Crear servidor Express
const server = express();

// Variable para mantener la instancia de la app
let app: any;

// Función de inicialización asíncrona
const bootstrap = async () => {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server)
    );
    
    // Configuraciones de la aplicación
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    
    // Inicializar la aplicación
    await app.init();
    
    console.log('NestJS application initialized');
  }
};

// Ejecutar bootstrap inmediatamente
bootstrap().catch(err => {
  console.error('Failed to bootstrap application:', err);
});

// Función handler para solicitudes
export default async (req: express.Request, res: express.Response) => {
  try {
    if (!app) {
      console.log('Initializing app on request');
      await bootstrap();
    }
    return server(req, res);
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
};
