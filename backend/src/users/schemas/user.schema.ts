import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Prop({ default: false })
  isMentor: boolean;

  @Prop({ type: Types.ObjectId })
  studentId?: Types.ObjectId;

  @Prop()
  phoneNumber?: string;

  @Prop()
  profilePicture?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastLogin?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isMentor: 1 });

