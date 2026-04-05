import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Quên dòng này là các module khác không thấy biến .env đâu
      envFilePath: '.env', // Đảm bảo đường dẫn đúng
    }),
    // Kết nối tới MongoDB từ biến môi trường
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/fin_buddy',
    ),
    NotificationsModule,
  ], // Các module khác mà ứng dụng của bạn phụ thuộc vào, có thể để trống nếu không cần
  controllers: [AppController], // Controller chính của ứng dụng, có thể để trống nếu không cần
  providers: [AppService], // Service chính của ứng dụng, có thể để trống nếu không cần
})
export class AppModule {}
