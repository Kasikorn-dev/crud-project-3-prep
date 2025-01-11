import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

@Controller('users') // กำหนด route หลักเป็น `/users`
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. สร้างผู้ใช้ใหม่
  @Post()
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user); // เรียกใช้ service เพื่อสร้าง user
  }

  // 2. ดึงข้อมูลผู้ใช้ทั้งหมด
  @Get()
  findAll() {
    return this.usersService.findAll(); // เรียกใช้ service เพื่อดึง user ทั้งหมด
  }

  // 3. ดึงข้อมูลผู้ใช้ตาม ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id); // เรียกใช้ service เพื่อดึง user ตาม ID
  }

  // 4. อัปเดตข้อมูลผู้ใช้
  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>) {
    return this.usersService.update(id, user); // เรียกใช้ service เพื่ออัปเดต user
  }

  // 5. ลบผู้ใช้
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id); // เรียกใช้ service เพื่อลบ user
  }
}
