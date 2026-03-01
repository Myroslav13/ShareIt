import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserServiceService {
   private readonly prisma = new PrismaClient({
      adapter: new PrismaPg({
         connectionString: process.env.DATABASE_URL,
      }),
   });

   async isExisting(id: number) {
      const user = await this.prisma.users.findUnique({
         where: { user_id: id },
      });

      if (!user) {
         throw new BadRequestException(`User with id ${id} does not exist`);
      }

      return user;
   }

   // Get requests
   async getAllUsers() {
      return this.prisma.users.findMany();
   }

   async getUserById(id: number) {
      await this.isExisting(id);

      return this.prisma.users.findUnique({
         where: { 
            user_id: id 
         },
      });
   }

   // Post requests
   async createUser(data: CreateUserDTO) {
      return this.prisma.users.create({
         data,
      });
   }

   // Put requests
   async updateUser(id: number, data: CreateUserDTO) {
      await this.isExisting(id);

      return this.prisma.users.update({
         where: { 
            user_id: id 
         },
         data,
      });
   }

   // Delete requests
   async deleteUser(id: number) {
      await this.isExisting(id);

      return this.prisma.users.delete({
         where: { 
            user_id: id 
         },
      });
   }
}
