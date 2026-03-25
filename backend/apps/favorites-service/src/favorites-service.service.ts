import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesServiceService {
  private prisma: PrismaClient;

   constructor() {
      const connectionString = process.env.DATABASE_URL;
      if (!connectionString) {
         throw new Error('DATABASE_URL is not set');
      }
      this.prisma = new PrismaClient({
         adapter: new PrismaPg({ connectionString }),
      });
   }

   async create(createFavoriteDto: CreateFavoriteDto) {
      return this.prisma.favorites.create({ data: createFavoriteDto });
   }

   async findAll(query: any) {
      return this.prisma.favorites.findMany({ where: query });
   }

   async findOne(id: number) {
      const favorite = await this.prisma.favorites.findUnique({ where: { favorite_id: id } });
      if (!favorite) throw new NotFoundException('Favorite not found');
      return favorite;
   }

   async remove(id: number) {
      return this.prisma.favorites.delete({ where: { favorite_id: id } });
   }
}
