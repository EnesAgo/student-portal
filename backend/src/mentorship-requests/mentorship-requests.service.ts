import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MentorshipRequest, MentorshipRequestDocument, RequestStatus } from './schemas/mentorship-request.schema';
import { CreateMentorshipRequestDto } from './dto/create-mentorship-request.dto';
import { UpdateMentorshipRequestDto } from './dto/update-mentorship-request.dto';

@Injectable()
export class MentorshipRequestsService {
  constructor(
    @InjectModel(MentorshipRequest.name)
    private mentorshipRequestModel: Model<MentorshipRequestDocument>,
  ) {}

  async create(createMentorshipRequestDto: CreateMentorshipRequestDto): Promise<MentorshipRequest> {
    const createdRequest = new this.mentorshipRequestModel({
      ...createMentorshipRequestDto,
      studentId: new Types.ObjectId(createMentorshipRequestDto.studentId),
      mentorId: new Types.ObjectId(createMentorshipRequestDto.mentorId),
    });

    return createdRequest.save();
  }

  async findAll(): Promise<MentorshipRequest[]> {
    return this.mentorshipRequestModel
      .find()
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByStudent(studentId: string): Promise<MentorshipRequest[]> {
    return this.mentorshipRequestModel
      .find({ studentId: new Types.ObjectId(studentId) })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByMentor(mentorId: string): Promise<MentorshipRequest[]> {
    return this.mentorshipRequestModel
      .find({ mentorId: new Types.ObjectId(mentorId) })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<MentorshipRequest> {
    const request = await this.mentorshipRequestModel
      .findById(id)
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .exec();

    if (!request) {
      throw new NotFoundException(`Mentorship request with ID ${id} not found`);
    }

    return request;
  }

  async update(id: string, updateMentorshipRequestDto: UpdateMentorshipRequestDto): Promise<MentorshipRequest> {
    const updateData: any = { ...updateMentorshipRequestDto };

    if (updateMentorshipRequestDto.status) {
      updateData.respondedAt = new Date();
    }

    const updatedRequest = await this.mentorshipRequestModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('studentId', '-password')
      .populate({
        path: 'mentorId',
        populate: { path: 'userId', select: '-password' },
      })
      .exec();

    if (!updatedRequest) {
      throw new NotFoundException(`Mentorship request with ID ${id} not found`);
    }

    return updatedRequest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.mentorshipRequestModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Mentorship request with ID ${id} not found`);
    }
  }

  async findPendingRequestsForMentor(mentorId: string): Promise<MentorshipRequest[]> {
    return this.mentorshipRequestModel
      .find({
        mentorId: new Types.ObjectId(mentorId),
        status: RequestStatus.PENDING,
      })
      .populate('studentId', '-password')
      .sort({ createdAt: -1 })
      .exec();
  }
}

