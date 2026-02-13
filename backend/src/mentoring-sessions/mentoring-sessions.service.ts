import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MentoringSession, MentoringSessionDocument, SessionStatus } from './schemas/mentoring-session.schema';
import { CreateMentoringSessionDto } from './dto/create-mentoring-session.dto';
import { UpdateMentoringSessionDto } from './dto/update-mentoring-session.dto';

@Injectable()
export class MentoringSessionsService {
  constructor(
    @InjectModel(MentoringSession.name)
    private mentoringSessionModel: Model<MentoringSessionDocument>,
  ) {}

  async create(createMentoringSessionDto: CreateMentoringSessionDto): Promise<MentoringSession> {
    const createdSession = new this.mentoringSessionModel({
      ...createMentoringSessionDto,
      studentId: new Types.ObjectId(createMentoringSessionDto.studentId),
      mentorId: new Types.ObjectId(createMentoringSessionDto.mentorId),
      duration: createMentoringSessionDto.duration || 30,
    });

    return createdSession.save();
  }

  async findAll(): Promise<MentoringSession[]> {
    return this.mentoringSessionModel
      .find()
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ scheduledAt: -1 })
      .exec();
  }

  async findByStudent(studentId: string): Promise<MentoringSession[]> {
    return this.mentoringSessionModel
      .find({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ scheduledAt: -1 })
      .exec();
  }

  async findByMentor(mentorId: string): Promise<MentoringSession[]> {
    return this.mentoringSessionModel
      .find({ mentorId: new Types.ObjectId(mentorId) })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ scheduledAt: -1 })
      .exec();
  }

  async findUpcoming(userId: string, isMentor: boolean): Promise<MentoringSession[]> {
    const query: any = {
      scheduledAt: { $gte: new Date() },
      status: SessionStatus.SCHEDULED,
    };

    if (isMentor) {
      query.mentorId = new Types.ObjectId(userId);
    } else {
      query.studentId = new Types.ObjectId(userId);
    }

    return this.mentoringSessionModel
      .find(query)
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ scheduledAt: 1 })
      .exec();
  }

  async findOne(id: string): Promise<MentoringSession> {
    const session = await this.mentoringSessionModel
      .findById(id)
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .exec();

    if (!session) {
      throw new NotFoundException(`Mentoring session with ID ${id} not found`);
    }

    return session;
  }

  async update(id: string, updateMentoringSessionDto: UpdateMentoringSessionDto): Promise<MentoringSession> {
    const updateData: any = { ...updateMentoringSessionDto };

    if (updateMentoringSessionDto.status === SessionStatus.COMPLETED) {
      updateData.completedAt = new Date();
    }

    const updatedSession = await this.mentoringSessionModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .exec();

    if (!updatedSession) {
      throw new NotFoundException(`Mentoring session with ID ${id} not found`);
    }

    return updatedSession;
  }

  async remove(id: string): Promise<void> {
    const result = await this.mentoringSessionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Mentoring session with ID ${id} not found`);
    }
  }
}

