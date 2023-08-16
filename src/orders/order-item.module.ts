import { Module } from '@nestjs/common';
import { OrdersItemController } from './order-item.controller';
import { OrdersItemService } from './order-items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './schemas/OrederItem';
import { ItemsModule } from 'src/items/items.module';
import { OrdersModule } from './orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
    ItemsModule,
    OrdersModule,
  ],
  controllers: [OrdersItemController],
  providers: [OrdersItemService],
})
export class OrdersItemModule {}
