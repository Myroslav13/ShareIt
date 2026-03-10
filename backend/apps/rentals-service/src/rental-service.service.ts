import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { CreateRentalDTO } from './dto/create-rental.dto';
import { filteredQueryRentalDto } from './dto/rental-query.dto';

@Injectable()
export class RentalServiceService {
   private readonly prisma = new PrismaClient({
      adapter: new PrismaPg({
         connectionString: process.env.DATABASE_URL,
      }),
   });

   async isExisting(id: number) {
      const rental = await this.prisma.rentals.findUnique({
         where: { rental_id: id },
      });

      if (!rental) {
         throw new BadRequestException(`Rental with id ${id} does not exist`);
      }

      return rental;
   }

   async getAllRentals(query: filteredQueryRentalDto) {
      const page = Number(query.page ?? 1);
      const pageSize = Number(query.pageSize ?? 20);

      // return await this.prisma.rentals.findMany({
      //    where: {
      //       ...(query.category_id && { category_id: query.category_id }),
      //       ...(query.owner_id && { owner_id: query.owner_id }),
      //       ...(query.available_from && { available_from: { gte: query.available_from } }),
      //       ...(query.available_to && { available_to: { lte: query.available_to } }),
      //    },
      //    skip: (page - 1) * pageSize,
      //    take: pageSize,
      // });
   }

   async getRentalById(id: number) {
      await this.isExisting(id);

      return this.prisma.rentals.findUnique({
         where: {
            rental_id: id,
         },
      });
   }

   async createRental(rentalData: CreateRentalDTO) {
      // return this.prisma.rentals.create({
      //    data: productData,
      // });
   }

   async updateRental(id: number, rentalData: CreateRentalDTO) {
      await this.isExisting(id);

      // return this.prisma.rentals.update({
      //    where: {
      //       rental_id: id,
      //    },
      //    data: productData,
      // });
   }

   async deleteRental(id: number) {
      await this.isExisting(id);

      return this.prisma.rentals.delete({
         where: {
            rental_id: id,
         },
      });
   }
}
