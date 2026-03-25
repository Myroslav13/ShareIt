import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { CreateProductDTO } from './dto/create-product.dto';
import { filteredQueryProductDto } from './dto/product-query.dto';

@Injectable()
export class ProductServiceService {
   private readonly prisma = new PrismaClient({
      adapter: new PrismaPg({
         connectionString: process.env.DATABASE_URL,
      }),
   });

   async isExisting(id: number) {
      const product = await this.prisma.products.findUnique({
         where: { product_id: id },
      });

      if (!product) {
         throw new BadRequestException(`Product with id ${id} does not exist`);
      }

      return product;
   }

   async getAllProducts(query: filteredQueryProductDto) {
      const page = Number(query.page ?? 1);
      const pageSize = Number(query.pageSize ?? 20);

      return await this.prisma.products.findMany({
         where: {
            ...(query.category_id && { category_id: query.category_id }),
            ...(query.owner_id && { owner_id: query.owner_id }),
            ...(query.available_from && { available_from: { gte: query.available_from } }),
            ...(query.available_to && { available_to: { lte: query.available_to } }),
         },
         skip: (page - 1) * pageSize,
         take: pageSize,
      });
   }

   async getProductById(id: number) {
      await this.isExisting(id);

      return this.prisma.products.findUnique({
         where: {
            product_id: id,
         },
      });
   }

   async createProduct(productData: CreateProductDTO) {
      return this.prisma.products.create({
         data: productData,
      });
   }

   async updateProduct(id: number, productData: CreateProductDTO) {
      await this.isExisting(id);

      return this.prisma.products.update({
         where: {
            product_id: id,
         },
         data: productData,
      });
   }

   async deleteProduct(id: number) {
      await this.isExisting(id);

      return this.prisma.products.delete({
         where: {
            product_id: id,
         },
      });
   }
}
