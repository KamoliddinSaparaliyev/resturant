import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TablesModule } from './tables/tables.module';
import { CategoriesModule } from './categories/categories.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { ItemsModule } from './items/items.module';
import { ItemOptionsModule } from './item_options/item_options.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemModule } from './orders/order-item.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    UsersModule,
    MeasurementsModule,
    TablesModule,
    CategoriesModule,
    ItemsModule,
    ItemOptionsModule,
    OrdersModule,
    OrdersItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
