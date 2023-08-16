import { Module } from '@nestjs/common';
import { ItemOptionsService } from './item_options.service';
import { ItemOptionsController } from './item_options.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemOption, ItemOptionSchema } from './schemas/ItemOption';
import {
  MeasurementSchema,
  Measurements,
} from 'src/measurements/schemas/Measurements';
import { Item, ItemSchema } from 'src/items/schemas/Item';
import { ItemsModule } from 'src/items/items.module';
import { MeasurementsModule } from 'src/measurements/measurements.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemOption.name, schema: ItemOptionSchema },
    ]),
    MeasurementsModule,
    ItemsModule,
  ],
  controllers: [ItemOptionsController],
  providers: [ItemOptionsService],
})
export class ItemOptionsModule {}
