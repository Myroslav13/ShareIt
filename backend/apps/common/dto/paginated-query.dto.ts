import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedQueryDTO {
   @IsInt()
   @IsOptional()
   @Type(() => Number)
   @Min(1)
   page?: number;

   @IsInt()
   @IsOptional()
   @Type(() => Number)
   @Min(1)
   pageSize?: number;
}