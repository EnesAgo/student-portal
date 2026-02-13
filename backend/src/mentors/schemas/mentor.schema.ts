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

  @Prop({ type: [String], default: [] })
  majors: string[];

  @Prop({ type: [String], default: [] })
  interests: string[]; // e.g., ["Academic Support", "Career Guidance", "Social Integration"]

  @Prop()
  yearOfStudy: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  totalRatings: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [{ day: String, startTime: String, endTime: String }], default: [] })
  availability: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;

  @Prop({ default: 0 })
  totalMentees: number;

  @Prop({ default: 5 })
  maxMentees: number;

  @Prop()
  linkedIn?: string;

  @Prop()
  instagram?: string;
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);

// Add indexes
MentorSchema.index({ userId: 1 });
MentorSchema.index({ isAvailable: 1 });
MentorSchema.index({ languages: 1 });
MentorSchema.index({ country: 1 });
MentorSchema.index({ majors: 1 });
