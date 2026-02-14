import { IsNotEmpty, IsString } from 'class-validator';

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
}

