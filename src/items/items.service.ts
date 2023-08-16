import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schemas/Item';
import { Model } from 'mongoose';
import { CategoriesService } from '../categories/categories.service';
import { InjectModel } from '@nestjs/mongoose';
import { QueryDto } from './dto/query.dto';
import { PaginationResponse } from 'src/shared/respone';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<Item>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: CreateItemDto): Promise<Item> {
    await this.categoriesService.show(data.category_id);

    const item = await this.itemModel.create(data);

    return item;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<Item>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { is_deleted, category_id, in_menu, type } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.itemModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.itemModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<Item> {
    const item = this.itemModel.findById(id);

    if (!item) throw new NotFoundException('Item topilmadi');

    return item;
  }

  async edit(id: string, data: UpdateItemDto): Promise<Item> {
    if (data.category_id) await this.categoriesService.show(data.category_id);

    const item = await this.itemModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return item;
  }

  async remove(id: string): Promise<Item> {
    const item = await this.itemModel.findByIdAndUpdate(
      id,
      {
        is_deleted: true,
      },
      { new: true },
    );

    return item;
  }
}
