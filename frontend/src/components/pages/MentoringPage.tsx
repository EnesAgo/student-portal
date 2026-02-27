"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/layout";
import { SearchFilter, MentorCard, MentorProfileModal, RequestModal } from "@/components/ui";
import { HowItWorks, AboutProgram } from "@/components/pages";
import { Mentor, FilterOptions } from "@/types/mentor";
import { fetchAndTransformMentors } from "@/services/api.service";

export default function MentoringPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    major: "",
    semester: "",
    language: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Fetch mentors from backend on component mount
  useEffect(() => {
    const loadMentors = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMentors = await fetchAndTransformMentors();
        setMentors(fetchedMentors);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load mentors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMentors();
  }, []);

  // Filter mentors based on search and filters
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          mentor.name.toLowerCase().includes(query) ||
          mentor.major.toLowerCase().includes(query) ||
          mentor.bio.toLowerCase().includes(query) ||
          mentor.languages.some((lang) => lang.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Major filter
      if (filters.major && mentor.major !== filters.major) {
        return false;
      }

      // Semester filter
      if (filters.semester) {
        const semesterRange = filters.semester;
        if (semesterRange === "3-4") {
          if (mentor.semester < 3 || mentor.semester > 4) return false;
        } else if (semesterRange === "5-6") {
          if (mentor.semester < 5 || mentor.semester > 6) return false;
        } else if (semesterRange === "7+") {
          if (mentor.semester < 7) return false;
        }
      }

      // Language filter
      if (filters.language) {
        if (!mentor.languages.includes(filters.language)) {
          return false;
        }
      }

      return true;
    });
  }, [mentors, filters, searchQuery]);

  const handleMentorClick = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsProfileModalOpen(true);
  };

  const handleRequestMentor = () => {
    setIsProfileModalOpen(false);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Mentor
          </h1>
          <p className="text-gray-600">
            Connect with experienced students who can support your academic and
            campus life journey.
          </p>
        </div>

        {/* Search and Filter Section */}
        {/*<SearchFilter*/}
        {/*  filters={filters}*/}
        {/*  onFilterChange={setFilters}*/}
        {/*  onSearchChange={setSearchQuery}*/}
        {/*  searchQuery={searchQuery}*/}
        {/*/>*/}

        {/* Mentor Cards Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Mentors
            </h2>
            <p className="text-sm text-gray-500">
              {filteredMentors.length} mentor{filteredMentors.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-4">Loading mentors...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          )}

          {/* Mentors Grid */}
          {!loading && !error && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onClick={() => handleMentorClick(mentor)}
                  />
                ))}
              </div>
              {filteredMentors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No mentors found matching your criteria.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* About Program Section */}
        <AboutProgram />
      </main>

      {/* Modals */}
      <MentorProfileModal
        mentor={selectedMentor}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onRequestMentor={handleRequestMentor}
      />

      <RequestModal
        mentor={selectedMentor}
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
}

