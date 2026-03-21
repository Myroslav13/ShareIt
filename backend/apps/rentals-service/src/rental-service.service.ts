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

      return await this.prisma.rentals.findMany({
         where: {
            ...(query.product_id && { product_id: query.product_id }),
            ...(query.renter_id && { renter_id: query.renter_id }),
            ...(query.start_date && { start_date: { gte: query.start_date } }),
            ...(query.end_date && { end_date: { lte: query.end_date } }),
            ...(query.status && { status: query.status }),
         },
         skip: (page - 1) * pageSize,
         take: pageSize,
      });
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
      return this.prisma.rentals.create({
         data: rentalData,
      });
   }

   async updateRental(id: number, rentalData: CreateRentalDTO) {
      await this.isExisting(id);

      return this.prisma.rentals.update({
         where: {
            rental_id: id,
         },
         data: rentalData,
      });
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
