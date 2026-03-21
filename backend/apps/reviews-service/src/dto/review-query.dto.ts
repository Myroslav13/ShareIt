import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class ReviewQueryDto {
  @IsOptional()
  @IsInt()
  rental_id?: number;

  @IsOptional()
  @IsInt()
  reviewer_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
