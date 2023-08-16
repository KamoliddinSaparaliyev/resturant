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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.ordersService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryOrderDto) {
    return this.ordersService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.show(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.ordersService.edit(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
