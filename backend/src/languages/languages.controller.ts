import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: { code: string; name: string }) {
    return this.languagesService.create(body.code, body.name);
  }

  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.languagesService.remove(id);
  }

  @Post('seed')
  @HttpCode(HttpStatus.OK)
  seedData() {
    return this.languagesService.seedInitialData();
  }
}

