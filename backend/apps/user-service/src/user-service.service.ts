import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from './dto/create-user.dto';
import { filteredQueryUserDto } from './dto/user-query.dto';

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
   async getAllUsers(query: filteredQueryUserDto) {
      const page = query.page ?? 1;
      const pageSize = query.pageSize ?? 20;
      
      return this.prisma.users.findMany({
         where: {
            ...(query.role_id && { role_id: query.role_id }),
            ...(query.location_id && { location_id: query.location_id }),
         },
         skip: (page - 1) * pageSize,
         take: pageSize,
      });
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
      try {
         return await this.prisma.users.create({
            data,
         });
      } catch (error) {
         if (error.code === 'P2002') {
            throw new BadRequestException('Email already exists');
         }
      }
   }

   // Put requests
   async updateUser(id: number, data: CreateUserDTO) {
      await this.isExisting(id);

      try {
         return await this.prisma.users.update({
            where: { 
               user_id: id 
            },
            data,
         });
      } catch (error) {
         if (error.code === 'P2002') {
            throw new BadRequestException('Email already exists');
         }
      }
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
