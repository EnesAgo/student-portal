import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MentoringSessionsService } from './mentoring-sessions.service';
import { CreateMentoringSessionDto } from './dto/create-mentoring-session.dto';
import { UpdateMentoringSessionDto } from './dto/update-mentoring-session.dto';

@Controller('mentoring-sessions')
export class MentoringSessionsController {
  constructor(private readonly mentoringSessionsService: MentoringSessionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMentoringSessionDto: CreateMentoringSessionDto) {
    return this.mentoringSessionsService.create(createMentoringSessionDto);
  }

  @Get()
  findAll() {
    return this.mentoringSessionsService.findAll();
  }

  @Get('upcoming')
  findUpcoming(@Query('userId') userId: string, @Query('isMentor') isMentor: string) {
    return this.mentoringSessionsService.findUpcoming(userId, isMentor === 'true');
  }

  @Get('student/:studentId')
  findByStudent(@Param('studentId') studentId: string) {
    return this.mentoringSessionsService.findByStudent(studentId);
  }

  @Get('mentor/:mentorId')
  findByMentor(@Param('mentorId') mentorId: string) {
    return this.mentoringSessionsService.findByMentor(mentorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentoringSessionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentoringSessionDto: UpdateMentoringSessionDto) {
    return this.mentoringSessionsService.update(id, updateMentoringSessionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentoringSessionsService.remove(id);
  }
}

