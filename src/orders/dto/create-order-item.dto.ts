import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  item_id: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
