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
import { MentorsService } from './mentors.service';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { SeedMentorsDto } from './dto/seed-mentors.dto';

@Controller('mentors')
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) {}

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  seedMainMentors(@Body() seedMentorsDto: SeedMentorsDto) {
    return this.mentorsService.seedMainMentors(seedMentorsDto.adminPassword);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMentorDto: CreateMentorDto) {
    return this.mentorsService.create(createMentorDto);
  }

  @Get()
  findAll(
    @Query('languages') languages?: string,
    @Query('country') country?: string,
    @Query('majors') majors?: string,
    @Query('interests') interests?: string,
    @Query('isAvailable') isAvailable?: string,
  ) {
    const filters: any = {};

    if (languages) {
      filters.languages = languages.split(',');
    }
    if (country) {
      filters.country = country;
    }
    if (majors) {
      filters.majors = majors.split(',');
    }
    if (interests) {
      filters.interests = interests.split(',');
    }
    if (isAvailable !== undefined) {
      filters.isAvailable = isAvailable === 'true';
    }

    return this.mentorsService.findAll(filters);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.mentorsService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentorDto: UpdateMentorDto) {
    return this.mentorsService.update(id, updateMentorDto);
  }

  @Patch(':id/rating')
  updateRating(@Param('id') id: string, @Body('rating') rating: number) {
    return this.mentorsService.updateRating(id, rating);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.mentorsService.remove(id);
  }
}

