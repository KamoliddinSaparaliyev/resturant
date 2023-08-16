import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table } from './schemas/Table';
import { CreateTableDto } from './dto/create-tables.dto';
import { UpdateTableDto } from './dto/update-tables.dto';
import { PaginationResponse } from 'src/shared/respone';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class TablesService {
  constructor(@InjectModel(Table.name) private tableModel: Model<Table>) {}

  async create(data: CreateTableDto): Promise<Table> {
    const table = await this.tableModel.create(data);

    return table;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<Table>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { is_deleted } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.tableModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.tableModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<Table> {
    const table = await this.tableModel.findById(id);

    if (!table) throw new NotFoundException('Table topilmadi.');

    return table;
  }

  async edit(id: string, data: UpdateTableDto): Promise<Table> {
    const table = await this.tableModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!table) throw new NotFoundException('Table topilmadi.');

    return table;
  }

  async remove(id: string): Promise<Table> {
    const table = await this.tableModel.findById(id).select('-is_deleted');

    if (!table) throw new NotFoundException('Table topilmadi.');

    table.is_deleted = true;

    table.save();

    return table;
  }
}
