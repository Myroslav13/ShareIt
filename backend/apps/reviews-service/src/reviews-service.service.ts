import * as dotenv from 'dotenv';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

@Injectable()
export class ReviewsServiceService {
   private readonly prisma = new PrismaClient({
      adapter: new PrismaPg({
         connectionString: process.env.DATABASE_URL,
      }),
   });

   async create(createReviewDto: CreateReviewDto) {
      return this.prisma.reviews.create({ data: createReviewDto });
   }

   async findAll(query: any) {
      return this.prisma.reviews.findMany({ where: query });
   }

   async findOne(id: number) {
      const review = await this.prisma.reviews.findUnique({ where: { review_id: id } });
      if (!review) throw new NotFoundException('Review not found');
      return review;
   }

   async update(id: number, data: Partial<CreateReviewDto>) {
      return this.prisma.reviews.update({ where: { review_id: id }, data });
   }

   async remove(id: number) {
      return this.prisma.reviews.delete({ where: { review_id: id } });
   }
}
