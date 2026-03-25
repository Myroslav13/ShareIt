import { PaginatedQueryDTO } from "apps/common/dto/paginated-query.dto";
import { Type } from "class-transformer";
import { IsOptional, IsInt, IsDateString } from "class-validator";

export class filteredQueryProductDto extends PaginatedQueryDTO {
   @IsInt()
   @IsOptional()
   @Type(() => Number)
   category_id?: number;

   @IsInt()
   @IsOptional()
   @Type(() => Number)
   owner_id?: number;

   @IsOptional()
   @IsDateString()
   available_from?: string;

   @IsOptional()
   @IsDateString()
   available_to?: string;
}