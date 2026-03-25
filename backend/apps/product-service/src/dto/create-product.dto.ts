import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProductDTO {
   @IsNotEmpty()
   @IsInt()
   @Min(1)
   owner_id!: number;

   @IsNotEmpty()
   @IsInt()
   @Min(1)
   category_id!: number;

   @IsNotEmpty()
   @IsInt()
   @Min(1)
   location_id!: number;

   @IsNotEmpty()
   @IsString()
   title!: string;
   
   @IsNotEmpty()
   @IsString()
   description!: string;

   @IsNotEmpty()
   @IsInt()
   @Min(0)
   price_per_day!: number;

   @IsNotEmpty()
   @IsDateString()
   available_from!: string;

   @IsNotEmpty()
   @IsDateString()
   available_to!: string;
}