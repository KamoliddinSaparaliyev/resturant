import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeasurementSchema, Measurements } from './schemas/Measurements';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Measurements.name, schema: MeasurementSchema },
    ]),
  ],
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
  exports: [MeasurementsService],
})
export class MeasurementsModule {}
