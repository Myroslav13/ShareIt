import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateUserDTO {
   @IsString()
   @IsNotEmpty()
   first_name!: string;

   @IsString()
   @IsNotEmpty()
   last_name!: string;

   @IsString()
   @IsNotEmpty()
   email!: string;

   @IsString()
   @IsNotEmpty()
   password_hash!: string;

   @IsInt()
   @IsNotEmpty()
   role_id!: number;
   
   @IsInt()
   @IsNotEmpty()
   location_id!: number;
};