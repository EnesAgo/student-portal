import { PartialType } from '@nestjs/mapped-types';
import { CreateMentorDto } from './create-mentor.dto';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateMentorDto extends PartialType(CreateMentorDto) {
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  totalMentees?: number;
}

