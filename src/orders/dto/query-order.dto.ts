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
import { OrderStatus, SortOrder } from 'src/shared/enum';

class Sort {
  @IsEnum(SortOrder)
  order: SortOrder;

  @IsNotEmpty()
  @IsIn(['created_at', 'updated_at'])
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
  table_id: string;

  @IsNotEmpty()
  @IsString()
  waiter_id: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: string;
}

export class QueryOrderDto {
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
