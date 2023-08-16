import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-tables.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {}
