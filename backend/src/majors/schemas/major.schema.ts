import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MajorDocument = Major & Document;

@Schema({ timestamps: true })
export class Major {
  @Prop({ required: true, unique: true })
  name: string; // e.g., "Computer Science", "Business Administration"

  @Prop()
  department?: string; // e.g., "Engineering", "Business"

  @Prop({ default: true })
  isActive: boolean;
}

export const MajorSchema = SchemaFactory.createForClass(Major);

MajorSchema.index({ name: 1 });
MajorSchema.index({ department: 1 });

