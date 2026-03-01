import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductServiceModule);
  const port = Number(process.env.PRODUCT_SERVICE_PORT ?? process.env.PORT ?? 3002);
  await app.listen(port);
}
bootstrap();
