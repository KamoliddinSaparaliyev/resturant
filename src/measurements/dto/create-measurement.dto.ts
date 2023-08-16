import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMeasurementDto {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsNumber()
  inc_by: Number;
}
