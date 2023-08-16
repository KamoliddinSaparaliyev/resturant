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
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrdersItemService } from './order-items.service';
import { QueryOrderItemDto } from './dto/query-order-item.dto';

@Controller('order-items')
export class OrdersItemController {
  constructor(private readonly ordersItemService: OrdersItemService) {}

  @Post()
  create(@Body() data: CreateOrderItemDto) {
    return this.ordersItemService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryOrderItemDto) {
    return this.ordersItemService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersItemService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderItemDto) {
    return this.ordersItemService.edit(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersItemService.remove(id);
  }
}
