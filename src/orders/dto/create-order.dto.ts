import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from 'src/shared/enum';

export class CreateOrderDto {
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
