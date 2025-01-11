import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';

@Module({
  imports: [
    // 1. เชื่อมต่อ Schema กับโมดูล
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController], // 2. กำหนด controller ที่ใช้ในโมดูลนี้
  providers: [UsersService], // 3. กำหนด service ที่ใช้ในโมดูลนี้
})
export class UsersModule {}
