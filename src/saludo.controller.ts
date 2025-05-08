import { Controller, Get } from '@nestjs/common';

@Controller()
export class SaludoController {
  @Get()
  obtenerRaiz() {
    return {
      mensaje: 'Bienvenido a la API de ProyecTIC',
      fecha: new Date().toISOString(),
    };
  }
}
