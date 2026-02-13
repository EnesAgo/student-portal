import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true, unique: true })
  code: string; // e.g., "US", "GB", "DE"

  @Prop({ required: true })
  name: string; // e.g., "United States", "United Kingdom", "Germany"

  @Prop({ default: true })
  isActive: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.index({ code: 1 });
CountrySchema.index({ name: 1 });

