import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TableDocument = HydratedDocument<Table>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updateda_at',
  },
})
export class Table {
  @Prop({
    type: Number,
    required: true,
  })
  number: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;
}

export const TableSchema = SchemaFactory.createForClass(Table);
