import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsEnum,
  IsString,
  ValidateNested,
  IsNotEmpty,
  IsIn,
  IsObject,
  IsBoolean,
} from 'class-validator';
import { Paginate } from 'src/shared/dto';
import { SortOrder } from 'src/shared/enum';

class Sort {
  @IsEnum(SortOrder)
  order: SortOrder;

  @IsNotEmpty()
  @IsIn(['name', 'created_at', 'unit', 'updated_at', 'price'])
  by: string;
}

export class Filter {
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    else if (value === 'false') return false;
    return value;
  })
  @IsBoolean()
  is_deleted: boolean;

  @IsNotEmpty()
  @IsString()
  item_id: string;

  @IsNotEmpty()
  @IsString()
  measurement_id: string;
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
