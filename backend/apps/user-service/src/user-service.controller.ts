import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

   @Get()
   async getAllUsers() {
      return this.userServiceService.getAllUsers();
   }

   @Get(':id')
   async getUserById(@Param('id', ParseIntPipe) id: number) {
      return this.userServiceService.getUserById(id);
   }

   @Post()
   async createUser(@Body() data: CreateUserDTO) {
      return this.userServiceService.createUser(data);
   }

   @Put(':id')
   async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: CreateUserDTO) {
      return this.userServiceService.updateUser(id, data);
   }

   @Delete(':id')
   async deleteUser(@Param('id', ParseIntPipe) id: number) {
      return this.userServiceService.deleteUser(id);
   }
}
