import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemOptionDto } from './dto/create-item_option.dto';
import { UpdateItemOptionDto } from './dto/update-item_option.dto';
import { ItemOption } from './schemas/ItemOption';
import { Model } from 'mongoose';
import { ItemsService } from 'src/items/items.service';
import { MeasurementsService } from 'src/measurements/measurements.service';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationResponse } from 'src/shared/respone';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class ItemOptionsService {
  constructor(
    @InjectModel(ItemOption.name)
    private itemOptionsModel: Model<ItemOption>,

    private readonly itemService: ItemsService,

    private readonly measurementsService: MeasurementsService,
  ) {}

  async create(data: CreateItemOptionDto): Promise<ItemOption> {
    await this.measurementsService.show(data.measurement_id);

    await this.itemService.show(data.item_id);

    const option = await this.itemOptionsModel.create(data);

    return option;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<ItemOption>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { is_deleted, item_id, measurement_id } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.itemOptionsModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.itemOptionsModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<ItemOption> {
    const option = await this.itemOptionsModel.findById(id);

    if (!option) throw new NotFoundException('Option topilamdi');

    return option;
  }

  async edit(id: string, data: UpdateItemOptionDto): Promise<ItemOption> {
    if (data.measurement_id)
      await this.measurementsService.show(data.measurement_id);

    if (data.item_id) await this.itemService.show(data.item_id);

    const option = await this.itemOptionsModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return option;
  }

  async remove(id: string): Promise<ItemOption> {
    const existing = await this.itemOptionsModel.findById(id);
    if (!existing) throw new NotFoundException('Option topilamdi');

    const option = await this.itemOptionsModel.findByIdAndUpdate(
      id,
      { is_deleted: true },
      { new: true },
    );

    return await option.save();
  }
}
