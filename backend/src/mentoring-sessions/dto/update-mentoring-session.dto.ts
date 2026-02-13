import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SessionStatus } from '../schemas/mentoring-session.schema';

export class UpdateMentoringSessionDto {
  @IsOptional()
  @IsEnum(SessionStatus)
  status?: SessionStatus;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  meetingLink?: string;
}

