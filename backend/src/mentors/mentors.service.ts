import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Mentor, MentorDocument } from './schemas/mentor.schema';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';

@Injectable()
export class MentorsService {
  constructor(
    @InjectModel(Mentor.name) private mentorModel: Model<MentorDocument>,
  ) {}

  async create(createMentorDto: CreateMentorDto): Promise<Mentor> {
    // Check if mentor profile already exists for this user
    const existingMentor = await this.mentorModel.findOne({
      userId: new Types.ObjectId(createMentorDto.userId),
    });

    if (existingMentor) {
      throw new ConflictException('Mentor profile already exists for this user');
    }

    const createdMentor = new this.mentorModel({
      ...createMentorDto,
      userId: new Types.ObjectId(createMentorDto.userId),
    });

    return createdMentor.save();
  }

  async findAll(filters?: {
    languages?: string[];
    country?: string;
    majors?: string[];
    interests?: string[];
    isAvailable?: boolean;
  }): Promise<Mentor[]> {
    const query: any = {};

    if (filters) {
      if (filters.languages && filters.languages.length > 0) {
        query.languages = { $in: filters.languages };
      }
      if (filters.country) {
        query.country = filters.country;
      }
      if (filters.majors && filters.majors.length > 0) {
        query.majors = { $in: filters.majors };
      }
      if (filters.interests && filters.interests.length > 0) {
        query.interests = { $in: filters.interests };
      }
      if (filters.isAvailable !== undefined) {
        query.isAvailable = filters.isAvailable;
      }
    }

    return this.mentorModel
      .find(query)
      .populate('userId', '-password')
      .exec();
  }

  async findOne(id: string): Promise<Mentor> {
    const mentor = await this.mentorModel
      .findById(id)
      .populate('userId', '-password')
      .exec();

    if (!mentor) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }

    return mentor;
  }

  async findByUserId(userId: string): Promise<Mentor> {
    const mentor = await this.mentorModel
      .findOne({ userId: new Types.ObjectId(userId) })
      .populate('userId', '-password')
      .exec();

    if (!mentor) {
      throw new NotFoundException(`Mentor profile not found for user ${userId}`);
    }

    return mentor;
  }

  async update(id: string, updateMentorDto: UpdateMentorDto): Promise<Mentor> {
    const updatedMentor = await this.mentorModel
      .findByIdAndUpdate(id, updateMentorDto, { new: true })
      .populate('userId', '-password')
      .exec();

    if (!updatedMentor) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }

    return updatedMentor;
  }

  async remove(id: string): Promise<void> {
    const result = await this.mentorModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Mentor with ID ${id} not found`);
    }
  }

  async updateRating(mentorId: string, newRating: number): Promise<Mentor> {
    const mentor = await this.mentorModel.findById(mentorId);
    if (!mentor) {
      throw new NotFoundException(`Mentor with ID ${mentorId} not found`);
    }

    const totalRatings = mentor.totalRatings + 1;
    const currentTotal = mentor.rating * mentor.totalRatings;
    const newAverage = (currentTotal + newRating) / totalRatings;

    return this.mentorModel
      .findByIdAndUpdate(
        mentorId,
        {
          rating: Math.round(newAverage * 10) / 10,
          totalRatings,
        },
        { new: true },
      )
      .populate('userId', '-password')
      .exec();
  }
}

