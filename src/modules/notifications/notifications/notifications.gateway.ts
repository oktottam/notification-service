import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TransactionEventDto } from '../dto/transaction-event.dto';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway {
  @WebSocketServer()
  server!: Server; // Sử dụng non-null assertion vì NestJS sẽ gán giá trị này sau khi khởi tạo

  handleConnection(client: Socket) {
    console.log(`⚡ Client connected: ${client.id}`);
  }

  // Hàm này để các service khác gọi khi muốn bắn thông báo
  sendToUser(userId: string, data: any) {
    this.server.emit(`notify_${userId}`, data);
    console.log(`📢 Notification sent to user ${userId}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
