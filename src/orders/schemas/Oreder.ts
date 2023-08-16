import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { OrderStatus } from 'src/shared/enum';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
  })
  table_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Measurments' })
  waiter_id: string;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: string;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
