import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updateda_at',
  },
})
export class Category {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
