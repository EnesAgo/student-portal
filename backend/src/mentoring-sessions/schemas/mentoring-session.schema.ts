import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MentoringSessionDocument = MentoringSession & Document;

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class MentoringSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Mentor', required: true })
  mentorId: Types.ObjectId;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop()
  duration: number; // in minutes

  @Prop({ required: true, enum: SessionStatus, default: SessionStatus.SCHEDULED })
  status: SessionStatus;

  @Prop()
  topic?: string;

  @Prop()
  notes?: string;

  @Prop()
  location?: string; // e.g., "Online - Zoom", "Library Room 3A"

  @Prop()
  meetingLink?: string;

  @Prop()
  completedAt?: Date;
}

export const MentoringSessionSchema = SchemaFactory.createForClass(MentoringSession);

// Add indexes
MentoringSessionSchema.index({ studentId: 1 });
MentoringSessionSchema.index({ mentorId: 1 });
MentoringSessionSchema.index({ scheduledAt: 1 });
MentoringSessionSchema.index({ status: 1 });

