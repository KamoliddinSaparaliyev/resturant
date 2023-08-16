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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { QueryDto } from './dto/query.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() data: CreateItemDto) {
    return this.itemsService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.itemsService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return this.itemsService.edit(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
