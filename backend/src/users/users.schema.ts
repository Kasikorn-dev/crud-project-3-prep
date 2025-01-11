import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; // Import decorators สำหรับสร้าง Schema
import e from 'express';
import { Document } from 'mongoose'; // ใช้เพื่อกำหนด Type ให้กับ Document ใน MongoDB

// Type ของ Document ใน MongoDB
export type UserDocument = User & Document;

// กำหนด Schema สำหรับ User
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;
}

// สร้าง Schema จาก Class
export const UserSchema = SchemaFactory.createForClass(User);
