import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Inject Model ของ User
  ) {}

  // 1. สร้างผู้ใช้ใหม่
  async create(user: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(user); // สร้าง instance ใหม่ของ User
    return createdUser.save(); // บันทึกลง MongoDB
  }

  // 2. ดึงผู้ใช้ทั้งหมด
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); // ดึงข้อมูลทั้งหมดจาก MongoDB
  }

  // 3. ดึงผู้ใช้ตาม ID
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec(); // ค้นหา User ด้วย ID
  }

  // 4. อัปเดตข้อมูลผู้ใช้
  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec(); // อัปเดต User และคืนค่าข้อมูลใหม่
  }

  // 5. ลบผู้ใช้
  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec(); // ลบ User ตาม ID
  }
}
