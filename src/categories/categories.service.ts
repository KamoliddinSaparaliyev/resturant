import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/Category';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryDto } from './dto/query.dto';
import { PaginationResponse } from 'src/shared/respone';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.create(data);

    return category;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<Category>> {
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

    const total = await this.categoryModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.categoryModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('Category topilmadi.');

    return category;
  }

  async edit(id: string, data: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!category) throw new NotFoundException('Category topilmadi.');

    return category;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findById(id)
      .select('-is_deleted');

    if (!category) throw new NotFoundException('Category topilmadi.');

    category.is_deleted = true;

    category.save();

    return category;
  }
}
