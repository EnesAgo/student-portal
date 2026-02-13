import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateMentorshipRequestDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsNotEmpty()
  @IsString()
  mentorId: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsDateString()
  proposedMeetingTime?: string;
}

