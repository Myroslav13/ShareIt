import { IsString, IsNotEmpty, IsInt, Min } from "class-validator";

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
   @Min(1)
   role_id!: number;
   
   @IsInt()
   @IsNotEmpty()
   location_id!: number;
};