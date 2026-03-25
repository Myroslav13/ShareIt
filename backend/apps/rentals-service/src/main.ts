import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { RentalServiceModule } from './rental-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RentalServiceModule);
  const port = Number(process.env.RENTAL_SERVICE_PORT ?? process.env.PORT ?? 3003);
  await app.listen(port);
}
bootstrap();
