import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule);
  const port = Number(process.env.USER_SERVICE_PORT ?? process.env.PORT ?? 3001);
  await app.listen(port);
}
bootstrap();
