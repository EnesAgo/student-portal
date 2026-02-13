import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Major, MajorDocument } from './schemas/major.schema';

@Injectable()
export class MajorsService {
  constructor(
    @InjectModel(Major.name) private majorModel: Model<MajorDocument>,
  ) {}

  async create(name: string, department?: string): Promise<Major> {
    const createdMajor = new this.majorModel({ name, department });
    return createdMajor.save();
  }

  async findAll(): Promise<Major[]> {
    return this.majorModel.find({ isActive: true }).sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<Major> {
    return this.majorModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    await this.majorModel.findByIdAndDelete(id).exec();
  }

  async seedInitialData(): Promise<void> {
    const count = await this.majorModel.countDocuments();
    if (count === 0) {
      const majors = [
        { name: 'Software Engineering', department: 'Engineering' },
        { name: 'Cyber Security', department: 'Engineering' },
        { name: 'Data Science And AI', department: 'Engineering' },
        { name: 'Digital Industrial Engineering', department: 'Engineering' },
      ];
      await this.majorModel.insertMany(majors);
    }
  }
}

