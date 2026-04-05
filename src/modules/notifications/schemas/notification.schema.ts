import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Tự động thêm createdAt và updatedAt
export class Notification extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  body!: string;

  @Prop({ default: false })
  isRead: boolean = false;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
