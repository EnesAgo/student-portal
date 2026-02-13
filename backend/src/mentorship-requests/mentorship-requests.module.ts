import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorshipRequestsService } from './mentorship-requests.service';
import { MentorshipRequestsController } from './mentorship-requests.controller';
import { MentorshipRequest, MentorshipRequestSchema } from './schemas/mentorship-request.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MentorshipRequest.name, schema: MentorshipRequestSchema },
    ]),
  ],
  controllers: [MentorshipRequestsController],
  providers: [MentorshipRequestsService],
  exports: [MentorshipRequestsService],
})
export class MentorshipRequestsModule {}

