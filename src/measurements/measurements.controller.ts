import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { QueryDto } from './dto/query.dto';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  create(@Body() data: CreateMeasurementDto) {
    return this.measurementsService.create(data);
  }

  @Get()
  findAll(@Query() query: QueryDto) {
    return this.measurementsService.list(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementsService.show(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeasurementDto: UpdateMeasurementDto,
  ) {
    return this.measurementsService.edit(id, updateMeasurementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementsService.remove(id);
  }
}
