import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MajorsService } from './majors.service';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { name: string; department?: string }) {
    return this.majorsService.create(body.name, body.department);
  }

  @Get()
  findAll() {
    return this.majorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.majorsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.majorsService.remove(id);
  }

  @Post('seed')
  @HttpCode(HttpStatus.OK)
  seedData() {
    return this.majorsService.seedInitialData();
  }
}

