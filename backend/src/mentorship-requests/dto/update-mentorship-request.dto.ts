import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RequestStatus } from '../schemas/mentorship-request.schema';

export class UpdateMentorshipRequestDto {
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;

  @IsOptional()
  @IsString()
  responseMessage?: string;
}

