import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  })
  category_id: string;

  @Prop({ enum: ['food', 'good'], default: 'good' })
  type: string;

  @Prop()
  photo: string;

  @Prop({ default: true })
  in_menu: boolean;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
