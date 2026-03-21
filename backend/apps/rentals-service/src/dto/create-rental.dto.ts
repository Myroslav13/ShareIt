import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateRentalDTO {
   @IsNotEmpty()
   @IsInt()
   @Min(1)
   product_id!: number;

   @IsNotEmpty()
   @IsInt()
   @Min(1)
   renter_id!: number;

   @IsNotEmpty()
   @IsDateString()
   start_date!: string;

   @IsNotEmpty()
   @IsDateString()
   end_date!: string;

   @IsOptional()
   @IsNumber()
   total_price?: number;

   @IsOptional()
   @IsString()
   status?: string;
}