import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ItemType } from 'src/shared/enum';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category_id: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  type: string;

  @IsUrl()
  photo: string;

  @IsNotEmpty()
  @IsBoolean()
  in_menu: boolean;
}
