import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentoringSessionsService } from './mentoring-sessions.service';
import { MentoringSessionsController } from './mentoring-sessions.controller';
import { MentoringSession, MentoringSessionSchema } from './schemas/mentoring-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MentoringSession.name, schema: MentoringSessionSchema },
    ]),
  ],
  controllers: [MentoringSessionsController],
  providers: [MentoringSessionsService],
  exports: [MentoringSessionsService],
})
export class MentoringSessionsModule {}

