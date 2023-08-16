import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './schemas/Oreder';
import { TablesService } from 'src/tables/tables.service';
import { InjectModel } from '@nestjs/mongoose';
import { MeasurementsService } from 'src/measurements/measurements.service';
import { PaginationResponse } from 'src/shared/respone';
import { QueryOrderDto } from './dto/query-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly tableService: TablesService,
    private readonly measurmantService: MeasurementsService,
  ) {}
  async create(data: CreateOrderDto): Promise<Order> {
    await this.measurmantService.show(data.waiter_id);

    await this.tableService.show(data.table_id);

    const order = await this.orderModel.create(data);

    return order;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryOrderDto): Promise<PaginationResponse<Order>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { is_deleted, waiter_id, table_id, status } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.orderModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.orderModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('Order topilmadi.');

    return order;
  }

  async edit(id: string, data: UpdateOrderDto): Promise<Order> {
    if (data.waiter_id) await this.measurmantService.show(data.waiter_id);

    if (data.table_id) await this.tableService.show(data.table_id);

    const existing = await this.orderModel.findById(id);

    if (!existing) throw new NotFoundException('Order topilmadi.');

    const order = await this.orderModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return order;
  }

  async remove(id: string): Promise<Order> {
    const existing = await this.orderModel.findById(id);

    if (!existing) throw new NotFoundException('Order topilmadi.');

    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true },
    );

    return order;
  }
}
