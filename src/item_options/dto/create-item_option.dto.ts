import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateItemOptionDto {
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @IsNotEmpty()
  @IsString()
  measurement_id: string;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
