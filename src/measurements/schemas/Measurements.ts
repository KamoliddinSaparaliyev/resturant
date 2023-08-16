import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MeasurementDocument = HydratedDocument<Measurements>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Measurements {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  inc_by: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: Boolean;
}

export const MeasurementSchema = SchemaFactory.createForClass(Measurements);
