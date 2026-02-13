import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MentorshipRequestsService } from './mentorship-requests.service';
import { CreateMentorshipRequestDto } from './dto/create-mentorship-request.dto';
import { UpdateMentorshipRequestDto } from './dto/update-mentorship-request.dto';

@Controller('mentorship-requests')
export class MentorshipRequestsController {
  constructor(private readonly mentorshipRequestsService: MentorshipRequestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMentorshipRequestDto: CreateMentorshipRequestDto) {
    return this.mentorshipRequestsService.create(createMentorshipRequestDto);
  }

  @Get()
  findAll() {
    return this.mentorshipRequestsService.findAll();
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.mentorshipRequestsService.findByStudent(studentId);
  }

  @Get('mentor/:mentorId')
  findByMentor(@Param('mentorId') mentorId: string) {
    return this.mentorshipRequestsService.findByMentor(mentorId);
  }

  @Get('mentor/:mentorId/pending')
  findPendingRequestsForMentor(@Param('mentorId') mentorId: string) {
    return this.mentorshipRequestsService.findPendingRequestsForMentor(mentorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorshipRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentorshipRequestDto: UpdateMentorshipRequestDto) {
    return this.mentorshipRequestsService.update(id, updateMentorshipRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentorshipRequestsService.remove(id);
  }
}

