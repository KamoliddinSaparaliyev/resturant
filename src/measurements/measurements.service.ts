import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Measurements } from './schemas/Measurements';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { PaginationResponse } from 'src/shared/respone';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class MeasurementsService {
  constructor(
    @InjectModel(Measurements.name)
    private measurementsModel: Model<Measurements>,
  ) {}

  async create(data: CreateMeasurementDto) {
    const measurement = await this.measurementsModel.create(data);
    return measurement;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<Measurements>> {
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

    const total = await this.measurementsModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.measurementsModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string) {
    const measurement = await this.measurementsModel.findById(id);

    if (!measurement) {
      throw new NotFoundException('Measurenment topilmadi.');
    }

    return measurement;
  }

  async edit(id: string, data: UpdateMeasurementDto) {
    const measurement = await this.measurementsModel.findById(id);

    if (!measurement) {
      throw new NotFoundException('Mea topilmadi.');
    }

    return this.measurementsModel.findByIdAndUpdate(id, data);
  }

  async remove(id: string) {
    const measurement = await this.measurementsModel.findById(id);

    if (!measurement) {
      throw new NotFoundException('User topilmadi.');
    }

    measurement.is_deleted = true;

    return measurement.save();
  }
}
