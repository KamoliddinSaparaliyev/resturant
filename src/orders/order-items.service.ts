import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Model } from 'mongoose';
import { OrderItem } from './schemas/OrederItem';
import { ItemsService } from 'src/items/items.service';
import { OrdersService } from './orders.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/shared/respone';
import { QueryOrderItemDto } from './dto/query-order-item.dto';

@Injectable()
export class OrdersItemService {
  constructor(
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>,
    private readonly itemService: ItemsService,
    private readonly orderService: OrdersService,
  ) {}
  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    await this.itemService.show(data.item_id);

    await this.orderService.show(data.order_id);

    const order_item = await this.orderItemModel.create(data);

    return order_item;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryOrderItemDto): Promise<PaginationResponse<OrderItem>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { item_id, order_id } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.orderItemModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.orderItemModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<OrderItem> {
    const order_item = await this.orderItemModel.findById(id);

    if (!order_item) throw new NotFoundException('Order Item topilmadi.');

    return order_item;
  }

  async edit(id: string, data: UpdateOrderItemDto): Promise<OrderItem> {
    if (data.item_id) await this.itemService.show(data.item_id);

    if (data.order_id) await this.orderService.show(data.order_id);

    const existing = await this.orderItemModel.findById(id);

    if (!existing) throw new NotFoundException('Order Item topilmadi.');

    const order_item = await this.orderItemModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return order_item;
  }

  async remove(id: string): Promise<OrderItem> {
    const existing = await this.orderItemModel.findById(id);

    if (!existing) throw new NotFoundException('Order Item topilmadi.');

    const order_item = await this.orderItemModel.findByIdAndRemove(id);

    return order_item;
  }
}
