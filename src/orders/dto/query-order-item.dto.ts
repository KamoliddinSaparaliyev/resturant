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
  @IsIn(['created_at', 'updated_at', 'quantity'])
  by: string;
}

export class Filter {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  item_id: string;
}

export class QueryOrderItemDto {
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
