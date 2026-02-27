import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Mentor, MentorDocument } from './schemas/mentor.schema';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/schemas/user.schema';

@Injectable()
export class MentorsService {
  constructor(
    @InjectModel(Mentor.name) private mentorModel: Model<MentorDocument>,
    private readonly usersService: UsersService,
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

  async seedMainMentors(adminPassword: string): Promise<{ message: string; mentors: any[] }> {
    // Validate admin password
    if (adminPassword !== 'admin') {
      throw new UnauthorizedException('Invalid admin password');
    }

    const mentorsData = [
      {
        user: {
          firstName: 'Edgars',
          lastName: 'Zeltmanis',
          email: 'edgars.zeltmanis@stu.uni-munich.de',
          password: 'password',
          role: UserRole.STUDENT,
        },
        mentor: {
          bio: 'Hi! I am Edgars, a Latvian student with diverse interests. I enjoy motorcycles, skiing, surfing, and golf. I speak multiple languages and am here to help international students adapt to university life.',
          languages: ['Latvian', 'English', 'German', 'Russian'],
          about: ['Hi! I am Edgars, a Latvian student with diverse interests. I enjoy motorcycles, skiing, surfing, and golf. I speak multiple languages and am here to help international students adapt to university life.'],
          country: 'Latvia',
          flag: 'LV',
          majors: ['Software Engineering'],
          interests: ['Social Integration', 'Language Support', 'Cultural Exchange'],
          image: '/mentorImages/EdgarsZeltmanis.jpg',
          isAvailable: true,
          personalInfo: {
            languages: 'Latvian, English, German, Russian',
            nationality: 'Latvian',
            hobbies: 'Motorcycles, Ski, Surfing, Golf',
          },
          academicBackground: {
            major: 'Software Engineering',
            currentSemester: 2,
            focusAreas: 'Software Development',
            experience: 'Currently Senior Tester',
          },
        },
      },
      {
        user: {
          firstName: 'Malsor',
          lastName: 'Arifi',
          email: 'malsor.arifi@stu.uni-munich.de',
          password: 'password',
          role: UserRole.STUDENT,
        },
        mentor: {
          bio: 'Greetings! I am Malsor, a Software Engineering student from Kosovo. I love football and coding. I am here to help fellow students with their academic journey and integration.',
          about: ['Greetings! I am Malsor, a Software Engineering student from Kosovo. I love football and coding. I am here to help fellow students with their academic journey and integration.'],
          languages: ['Albanian', 'English'],
          country: 'Kosovo',
          flag: 'XK',
          majors: ['Software Engineering'],
          interests: ['Academic Support', 'Career Guidance', 'Technical Skills'],
          image: '/mentorImages/MalsorArifi.jpeg',
          isAvailable: true,
          personalInfo: {
            languages: 'Albanian, English',
            nationality: 'Kosovar',
            hobbies: 'Football, Coding',
          },
          academicBackground: {
            major: 'Software Engineering',
            currentSemester: 2,
            focusAreas: 'Software Development',
            experience: 'Currently Python Backend Developer Intern',
          },
        },
      },
      {
        user: {
          firstName: 'Timothy Lule Philemond',
          lastName: 'Mbobbo',
          email: 'timothy.mbobbo@stu.uni-munich.de',
          password: 'password',
          role: UserRole.STUDENT,
        },
        mentor: {
          bio: 'Hello! I am Timothy from Uganda, currently studying Data Science. I enjoy rugby, swimming, and relaxing. I am here to support international students in their academic and personal journey.',
          about: ['Hello! I am Timothy from Uganda, currently studying Data Science. I enjoy rugby, swimming, and relaxing. I am here to support international students in their academic and personal journey.'],
          languages: ['English', 'Luganda'],
          country: 'Uganda',
          flag: 'UG',
          majors: ['Data Science'],
          interests: ['Academic Support', 'Social Integration', 'Sports'],
          image: '/mentorImages/TimothyLulePhilemondMbobbo.jpg',
          isAvailable: true,
          personalInfo: {
            languages: 'English, Luganda',
            nationality: 'Ugandan',
            hobbies: 'Rugby, Swimming, Relaxing',
          },
          academicBackground: {
            major: 'Data Science',
            currentSemester: 2,
            focusAreas: 'Data Analysis and Machine Learning',
            experience: 'Data Science student with passion for sports',
          },
        },
      },
      {
        user: {
          firstName: 'Enes',
          lastName: 'Ago',
          email: 'enes.ago@stu.uni-munich.de',
          password: 'password',
          role: UserRole.STUDENT,
        },
        mentor: {
          bio: 'Hey! I am Enes, a Cyber Security student from North Macedonia. I enjoy playing piano, coding, and skateboarding. I am passionate about helping international students navigate their university experience.',
          about: ['Hey! I am Enes, a Cyber Security student from North Macedonia. I enjoy playing piano, coding, and skateboarding. I am passionate about helping international students navigate their university experience.'],
          languages: ['Macedonian', 'English', 'Turkish'],
          country: 'North Macedonia',
          flag: 'MK',
          majors: ['Cyber Security'],
          interests: ['Academic Support', 'Technical Skills', 'Social Integration'],
          image: '/mentorImages/EnesAgo.png',
          isAvailable: true,
          personalInfo: {
            languages: 'Macedonian, English, Turkish',
            nationality: 'Macedonian',
            hobbies: 'Playing Piano, Coding, Skateboarding',
          },
          academicBackground: {
            major: 'Cyber Security',
            currentSemester: 2,
            focusAreas: 'Cybersecurity and Software Development',
            experience: 'Currently Fullstack Developer Intern',
          },
        },
      },
    ];

    const createdMentors = [];

    for (const data of mentorsData) {
      try {
        // Check if user already exists
        const existingUser = await this.usersService.findByEmail(data.user.email);

        let userId: string;

        if (existingUser) {
          userId = existingUser._id.toString();
          // Update user to be a mentor
          await this.usersService.update(userId, { isMentor: true });
        } else {
          // Create user
          const newUser = await this.usersService.create(data.user);
          userId = (newUser as any)._id.toString();
          // Update user to be a mentor
          await this.usersService.update(userId, { isMentor: true });
        }

        // Check if mentor profile already exists
        const existingMentor = await this.mentorModel.findOne({
          userId: new Types.ObjectId(userId),
        });

        if (existingMentor) {
          createdMentors.push({
            status: 'already_exists',
            user: data.user.email,
            mentorId: existingMentor._id,
          });
          continue;
        }

        // Create mentor profile
        const mentor = new this.mentorModel({
          ...data.mentor,
          userId: new Types.ObjectId(userId),
          email: data.user.email,
        });

        const savedMentor = await mentor.save();
        createdMentors.push({
          status: 'created',
          user: data.user.email,
          mentorId: savedMentor._id,
        });
      } catch (error) {
        createdMentors.push({
          status: 'error',
          user: data.user.email,
          error: error.message,
        });
      }
    }

    return {
      message: 'Main mentors seeding completed',
      mentors: createdMentors,
    };
  }
}

