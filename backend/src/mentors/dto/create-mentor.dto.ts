import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AcademicBackgroundDto {
  @IsString()
  major: string;

  @IsNumber()
  currentSemester: number;

  @IsString()
  focusAreas: string;

  @IsString()
  experience: string;
}

class PersonalInfoDto {
  @IsString()
  languages: string;

  @IsString()
  nationality: string;

  @IsString()
  hobbies: string;
}

class MentorshipFocusDto {
  @IsString()
  whoCanHelp: string;

  @IsArray()
  @IsString({ each: true })
  topics: string[];
}

export class CreateMentorDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  flag?: string;

  @IsArray()
  @IsString({ each: true })
  majors: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsOptional()
  @IsNumber()
  semester?: number;

  @IsNotEmpty()
  @IsString()
  yearOfStudy: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  maxMentees?: number;

  @IsOptional()
  @IsString()
  linkedIn?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  about?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AcademicBackgroundDto)
  academicBackground?: AcademicBackgroundDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo?: PersonalInfoDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MentorshipFocusDto)
  mentorshipFocus?: MentorshipFocusDto;
}

