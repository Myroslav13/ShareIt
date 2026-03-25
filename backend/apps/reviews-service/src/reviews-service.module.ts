import { Module } from '@nestjs/common';
import { ReviewsServiceService } from './reviews-service.service';
import { ReviewsServiceController } from './reviews-service.controller';

@Module({
  controllers: [ReviewsServiceController],
  providers: [ReviewsServiceService],
})
export class ReviewsServiceModule {}
