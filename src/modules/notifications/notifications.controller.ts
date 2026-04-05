import { Controller, Get, Param, Patch } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { TransactionEventDto } from './dto/transaction-event.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly gateway: NotificationsGateway,
    private readonly notificationsService: NotificationsService,
  ) {}

  @EventPattern('transaction_created') // Tên topic/queue từ Spring Boot
  async handleTransactionEvent(@Payload() data: TransactionEventDto) {
    const { userId, amount, message } = data;
    const title = 'Biến động số dư';
    const body = `Bạn vừa chi ${amount.toLocaleString()}đ cho: ${message}`;

    // 1. Lưu vào MongoDB
    await this.notificationsService.create({ userId, title, body });

    // 2. Bắn tin real-time qua WebSockets
    this.gateway.sendToUser(userId, { title, body, timestamp: new Date() });

    console.log(`✅ Đã lưu và gửi thông báo cho user: ${userId}`);
  }

  // Thêm API này để Angular gọi lấy lịch sử thông báo
  @Get(':userId')
  async getHistory(@Param('userId') userId: string) {
    return this.notificationsService.getHistory(userId);
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
