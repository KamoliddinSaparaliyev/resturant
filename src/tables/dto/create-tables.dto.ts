import { IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @IsNotEmpty()
  number: number;
}
