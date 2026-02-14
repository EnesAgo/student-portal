import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MentorDocument = Mentor & Document;

@Schema({ timestamps: true })
export class Mentor {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  bio: string;

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop()
  country: string;

  @Prop()
  flag: string;

  @Prop({ type: [String], default: [] })
  majors: string[];

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop()
  semester: number;

  @Prop()
  yearOfStudy: string;

  @Prop()
  image: string;

  @Prop()
  email: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: 0 })
  totalMentees: number;

  @Prop({ default: 5 })
  maxMentees: number;

  @Prop()
  linkedIn?: string;

  @Prop()
  instagram?: string;

  // Optional detailed fields from frontend
  @Prop({ type: [String] })
  about?: string[];

  @Prop({ type: Object })
  academicBackground?: {
    major: string;
    currentSemester: number;
    focusAreas: string;
    experience: string;
  };

  @Prop({ type: Object })
  personalInfo?: {
    languages: string;
    nationality: string;
    hobbies: string;
  };

  @Prop({ type: Object })
  mentorshipFocus?: {
    whoCanHelp: string;
    topics: string[];
  };
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

// Add indexes
MentorSchema.index({ userId: 1 });
MentorSchema.index({ isAvailable: 1 });
MentorSchema.index({ languages: 1 });
MentorSchema.index({ country: 1 });
MentorSchema.index({ majors: 1 });
