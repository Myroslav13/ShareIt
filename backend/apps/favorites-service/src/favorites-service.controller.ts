import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { FavoritesServiceService } from './favorites-service.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoriteQueryDto } from './dto/favorite-query.dto';

@Controller('favorites')
export class FavoritesServiceController {
   constructor(private readonly favoritesService: FavoritesServiceService) {}

   @Post()
   create(@Body() createFavoriteDto: CreateFavoriteDto) {
      return this.favoritesService.create(createFavoriteDto);
   }

   @Get()
   findAll(@Query() query: FavoriteQueryDto) {
      return this.favoritesService.findAll(query);
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.favoritesService.findOne(Number(id));
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.favoritesService.remove(Number(id));
   }
}
