import { PaginatedQueryDTO } from "apps/common/dto/paginated-query.dto";
import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class filteredQueryUserDto extends PaginatedQueryDTO {
   @IsInt()
   @IsOptional()
   @Type(() => Number)
   role_id?: number;

   @IsInt()
   @IsOptional()
   @Type(() => Number)
   location_id?: number;
}