import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MentorsModule } from './mentors/mentors.module';
import { MentorshipRequestsModule } from './mentorship-requests/mentorship-requests.module';
import { LanguagesModule } from './languages/languages.module';
import { CountriesModule } from './countries/countries.module';
import { MajorsModule } from './majors/majors.module';
import { MentoringSessionsModule } from './mentoring-sessions/mentoring-sessions.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    UsersModule,
    MentorsModule,
    MentorshipRequestsModule,
    LanguagesModule,
    CountriesModule,
    MajorsModule,
    MentoringSessionsModule,
  ],
})
export class AppModule {}

