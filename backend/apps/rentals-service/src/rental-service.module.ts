import { Module } from '@nestjs/common';
import { RentalServiceController } from './rental-service.controller';
import { RentalServiceService } from './rental-service.service';

@Module({
  imports: [],
  controllers: [RentalServiceController],
  providers: [RentalServiceService],
})
export class RentalServiceModule {}
