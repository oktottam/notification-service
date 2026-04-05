import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật cái này để NestJS tự động check DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Xóa bỏ những field không được khai báo trong DTO
      transform: true, // Tự động convert kiểu dữ liệu (ví dụ string sang number)
    }),
  );

  // Kết nối thêm Microservice RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      // Ép kiểu hoặc dùng fallback string
      urls: [process.env.RABBITMQ_URL ?? 'amqp://localhost:5672'],
      queue: process.env.RABBITMQ_QUEUE ?? 'notifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
