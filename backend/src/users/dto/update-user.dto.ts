import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z0-9._/-]+$/, {
    message: 'studentId must contain only letters, numbers, dots, underscores, slashes, and hyphens',
  })
  studentId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
