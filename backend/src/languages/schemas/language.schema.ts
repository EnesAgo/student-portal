import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema({ timestamps: true })
export class Language {
  @Prop({ required: true, unique: true })
  code: string; // e.g., "en", "es", "fr"

  @Prop({ required: true })
  name: string; // e.g., "English", "Spanish", "French"

  @Prop({ default: true })
  isActive: boolean;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

LanguageSchema.index({ code: 1 });
LanguageSchema.index({ name: 1 });

