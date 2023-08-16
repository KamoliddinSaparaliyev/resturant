import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { QueryDto } from './dto/query.dto';
import { PaginationResponse } from 'src/shared/respone';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    data.password = hash;
    const user = await this.userModel.create(data);
    return user;
  }

  async list({
    page,
    q,
    sort,
    filter,
  }: QueryDto): Promise<PaginationResponse<User>> {
    const { limit, offset } = page || {};
    const { by, order = 'desc' } = sort || {};
    const { is_deleted, role } = filter || {};

    const search = q
      ? {
          name: {
            $regex: q,
            $options: 'i',
          },
        }
      : {};

    const total = await this.userModel
      .find({ ...search, ...filter })
      .countDocuments();

    const data = await this.userModel
      .find({ ...search, ...filter })
      .sort({ [by]: order === 'desc' ? -1 : 1 })
      .limit(limit)
      .skip(limit * offset);
    return { limit, offset, total, data };
  }

  async show(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User topilmadi.');
    }

    return user;
  }

  async edit(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User topilmadi.');
    }

    if (data.password) {
      const hash = await bcrypt.hash(data.password, saltOrRounds);
      data.password = hash;
    }

    return this.userModel.findByIdAndUpdate(id, data);
  }

  async remove(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User topilmadi.');
    }

    user.is_deleted = true;

    return user.save();
  }
}
