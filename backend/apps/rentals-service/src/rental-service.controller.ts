import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body, Query } from '@nestjs/common';
import { RentalServiceService } from './rental-service.service';
import { CreateRentalDTO } from './dto/create-rental.dto';
import { filteredQueryRentalDto } from './dto/rental-query.dto';

@Controller('rental')
export class RentalServiceController {
  constructor(private readonly rentalServiceService: RentalServiceService) {}

   @Get()
   async getAllProducts(@Query() query: filteredQueryRentalDto) {
      return this.rentalServiceService.getAllProducts(query);
   }

   @Get(':id')
   async getProductById(@Param('id', ParseIntPipe) id: number) {
      return this.rentalServiceService.getProductById(id);
   }

   @Post()
   async createProduct(@Body() productData: CreateRentalDTO) {
      return this.rentalServiceService.createProduct(productData);
   }

   @Put(':id')
   async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: CreateRentalDTO) {
      return this.rentalServiceService.updateProduct(id, productData);
   }

   @Delete(':id')
   async deleteProduct(@Param('id', ParseIntPipe) id: number) {
      return this.rentalServiceService.deleteProduct(id);
   }
}
