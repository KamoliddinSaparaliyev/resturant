import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ItemOptionDocument = ItemOption & Document;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class ItemOption {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  })
  item_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurements',
    required: true,
  })
  measurement_id: string;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const ItemOptionSchema = SchemaFactory.createForClass(ItemOption);
