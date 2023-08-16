import { Type } from 'class-transformer';
import {
  IsOptional,
  IsEnum,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsIn,
  IsObject,
} from 'class-validator';
import { Filter, Paginate } from 'src/shared/dto';
import { SortOrder } from 'src/shared/enum';

class Sort {
  @IsEnum(SortOrder)
  order: SortOrder;

  @IsNotEmpty()
  @IsIn(['number', 'created_at', 'updated_at'])
  by: string;
}

export class QueryDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Sort)
  sort?: Sort;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Paginate)
  page?: Paginate;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Filter)
  filter?: Filter;
}
