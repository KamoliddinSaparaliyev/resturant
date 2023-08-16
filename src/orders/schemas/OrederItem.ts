import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<OrderItem>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class OrderItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
  })
  item_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order_id: string;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
