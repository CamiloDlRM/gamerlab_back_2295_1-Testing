import { Module } from '@nestjs/common';
import { SaludoController } from './saludo.controller';

@Module({
  imports: [],
  controllers: [SaludoController],
  providers: [],
})
export class AppModule {}
