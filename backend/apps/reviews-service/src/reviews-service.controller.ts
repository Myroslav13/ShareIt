import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { ReviewsServiceService } from './reviews-service.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQueryDto } from './dto/review-query.dto';

@Controller('reviews')
export class ReviewsServiceController {
  constructor(private readonly reviewsService: ReviewsServiceService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(@Query() query: ReviewQueryDto) {
    return this.reviewsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateReviewDto>) {
    return this.reviewsService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(Number(id));
  }
}
