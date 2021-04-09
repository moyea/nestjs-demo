import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
