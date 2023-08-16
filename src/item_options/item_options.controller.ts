import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ItemOptionsService } from './item_options.service';
import { CreateItemOptionDto } from './dto/create-item_option.dto';
import { UpdateItemOptionDto } from './dto/update-item_option.dto';
import { QueryDto } from './dto/query.dto';

@Controller('item-options')
export class ItemOptionsController {
  constructor(private readonly itemOptionsService: ItemOptionsService) {}

  @Post()
  create(@Body() data: CreateItemOptionDto) {
    return this.itemOptionsService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.itemOptionsService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemOptionsService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateItemOptionDto) {
    return this.itemOptionsService.edit(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemOptionsService.remove(id);
  }
}
