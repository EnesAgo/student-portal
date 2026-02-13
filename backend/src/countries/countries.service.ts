import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async create(code: string, name: string): Promise<Country> {
    const createdCountry = new this.countryModel({ code, name });
    return createdCountry.save();
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find({ isActive: true }).sort({ name: 1 }).exec();
  }

  async findOne(id: string): Promise<Country> {
    return this.countryModel.findById(id).exec();
  }

  async remove(id: string): Promise<void> {
    await this.countryModel.findByIdAndDelete(id).exec();
  }

  async seedInitialData(): Promise<void> {
    const count = await this.countryModel.countDocuments();
    if (count === 0) {
      const countries = [
        { code: 'DE', name: 'Germany' },
        { code: 'TR', name: 'Turkey' },
        { code: 'UG', name: 'Uganda' },
        { code: 'IT', name: 'Italy' },
        { code: 'RO', name: 'Romania' },
        { code: 'LV', name: 'Latvia' },
        { code: 'AL', name: 'Albania' },
        { code: 'MK', name: 'North Macedonia' },
      ];
      await this.countryModel.insertMany(countries);
    }
  }
}

