import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto } from './dto/create-tables.dto';
import { UpdateTableDto } from './dto/update-tables.dto';
import { QueryDto } from './dto/query.dto';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() data: CreateTableDto) {
    return this.tablesService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.tablesService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTableDto) {
    return this.tablesService.edit(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
