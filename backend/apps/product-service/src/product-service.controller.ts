import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

   @Get()
   async getAllProducts() {
      return this.productServiceService.getAllProducts();
   }

   @Get(':id')
   async getProductById(@Param('id', ParseIntPipe) id: number) {
      return this.productServiceService.getProductById(id);
   }

   @Post()
   async createProduct(@Body() productData: CreateProductDTO) {
      return this.productServiceService.createProduct(productData);
   }

   @Put(':id')
   async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() productData: CreateProductDTO) {
      return this.productServiceService.updateProduct(id, productData);
   }

   @Delete(':id')
   async deleteProduct(@Param('id', ParseIntPipe) id: number) {
      return this.productServiceService.deleteProduct(id);
   }
}
