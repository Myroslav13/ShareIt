import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
import { RentalServiceService } from './rental-service.service';
import { CreateRentalDTO } from './dto/create-rental.dto';
import { filteredQueryRentalDto } from './dto/rental-query.dto';

@Controller('rental')
export class RentalServiceController {
  constructor(private readonly rentalServiceService: RentalServiceService) {}

   @Get()
   async getAllRentals(@Query() query: filteredQueryRentalDto) {
      return this.rentalServiceService.getAllRentals(query);
   }

   @Get(':id')
   async getRentalById(@Param('id', ParseIntPipe) id: number) {
      return this.rentalServiceService.getRentalById(id);
   }

   @Post()
   async createRental(@Body() rentalData: CreateRentalDTO) {
      return this.rentalServiceService.createRental(rentalData);
   }

   @Put(':id')
   async updateRental(@Param('id', ParseIntPipe) id: number, @Body() rentalData: CreateRentalDTO) {
      return this.rentalServiceService.updateRental(id, rentalData);
   }

   @Delete(':id')
   async deleteRental(@Param('id', ParseIntPipe) id: number) {
      return this.rentalServiceService.deleteRental(id);
   }
}
