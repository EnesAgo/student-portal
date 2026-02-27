import { IsNotEmpty, IsString } from 'class-validator';

export class SeedMentorsDto {
  @IsNotEmpty()
  @IsString()
  adminPassword: string;
}

