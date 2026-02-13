import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Language, LanguageDocument } from './schemas/language.schema';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
  ) {}

  async create(code: string, name: string): Promise<Language> {
    const createdLanguage = new this.languageModel({ code, name });
    return createdLanguage.save();
  }

  async findAll(): Promise<Language[]> {
    return this.languageModel.find({ isActive: true }).sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<Language> {
    return this.languageModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    await this.languageModel.findByIdAndDelete(id).exec();
  }

  async seedInitialData(): Promise<void> {
    const count = await this.languageModel.countDocuments();
    if (count === 0) {
      const languages = [
        { code: 'de', name: 'German' },
        { code: 'en', name: 'English' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ro', name: 'Romanian' },
        { code: 'ru', name: 'Russian' },
        { code: 'it', name: 'Italian' },
        { code: 'mk', name: 'Macedonian' },
        { code: 'sq', name: 'Albanian' },
        { code: 'lv', name: 'Latvian' },
        { code: 'lg', name: 'Luganda' },
      ];
      await this.languageModel.insertMany(languages);
    }
  }
}

