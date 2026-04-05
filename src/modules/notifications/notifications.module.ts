import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schemas/notification.schema';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationsGateway, NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
