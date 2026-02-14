import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MentorshipRequestDocument = MentorshipRequest & Document;

export enum RequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class MentorshipRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Mentor', required: true })
  mentorId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;


  @Prop()
  responseMessage?: string;

  @Prop()
  respondedAt?: Date;
}

export const MentorshipRequestSchema = SchemaFactory.createForClass(MentorshipRequest);

// Add indexes
MentorshipRequestSchema.index({ studentId: 1 });
MentorshipRequestSchema.index({ mentorId: 1 });
MentorshipRequestSchema.index({ status: 1 });
MentorshipRequestSchema.index({ createdAt: -1 });

