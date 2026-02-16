"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { FilterOptions } from "@/types/mentor";
import { fetchMajors, fetchLanguages, Major, Language } from "@/services/api.service";

interface SearchFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onSearchChange: (search: string) => void;
  searchQuery: string;
}

export default function SearchFilter({ filters, onFilterChange, onSearchChange, searchQuery }: SearchFilterProps) {
  const [majors, setMajors] = useState<Major[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [fetchedMajors, fetchedLanguages] = await Promise.all([
          fetchMajors(),
          fetchLanguages(),
        ]);
        setMajors(fetchedMajors.filter(m => m.isActive));
        setLanguages(fetchedLanguages.filter(l => l.isActive));
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    loadOptions();
  }, []);

  const handleClearFilters = () => {
    onFilterChange({ major: "", semester: "", language: "" });
    onSearchChange("");
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, major, language, or interest"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.major}
              onChange={(e) => onFilterChange({ ...filters, major: e.target.value })}
            >
              <option value="">All Majors</option>
              {majors.map((major) => (
                <option key={major._id} value={major.name}>
                  {major.name}
                </option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.semester}
              onChange={(e) => onFilterChange({ ...filters, semester: e.target.value })}
            >
              <option value="">All Semesters</option>
              <option value="3-4">Semester 3-4</option>
              <option value="5-6">Semester 5-6</option>
              <option value="7+">Semester 7+</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.language}
              onChange={(e) => onFilterChange({ ...filters, language: e.target.value })}
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language._id} value={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

