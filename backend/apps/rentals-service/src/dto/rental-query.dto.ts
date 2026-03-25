import { PaginatedQueryDTO } from "apps/common/dto/paginated-query.dto";
import { Type } from "class-transformer";
import { IsOptional, IsInt, IsDateString, IsString } from "class-validator";

export class filteredQueryRentalDto extends PaginatedQueryDTO {
   @IsInt()
   @IsOptional()
   @Type(() => Number)
   product_id?: number;

   @IsInt()
   @IsOptional()
   @Type(() => Number)
   renter_id?: number;

   @IsOptional()
   @IsDateString()
   start_date?: string;

   @IsOptional()
   @IsDateString()
   end_date?: string;

   @IsOptional()
   @IsString()
   status?: string;
}