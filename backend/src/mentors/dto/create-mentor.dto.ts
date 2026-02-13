import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
} from 'class-validator';

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

  @IsArray()
  @IsString({ each: true })
  majors: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @IsNotEmpty()
  @IsString()
  yearOfStudy: string;

  @IsOptional()
  @IsArray()
  availability?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;

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
}

