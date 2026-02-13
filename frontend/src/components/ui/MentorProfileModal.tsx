"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Mentor } from "@/types/mentor";
import { useEffect } from "react";

interface MentorProfileModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestMentor: () => void;
}

export default function MentorProfileModal({
  mentor,
  isOpen,
  onClose,
  onRequestMentor,
}: MentorProfileModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !mentor) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Mentor Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex items-start space-x-6 mb-8 pb-8 border-b border-gray-200">
            <Image
              src={mentor.image}
              alt={mentor.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {mentor.name}
              </h3>
              <p className="text-gray-600 mb-3">
                {mentor.major}, Semester {mentor.semester}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {mentor.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {mentor.flag} {mentor.nationality}
              </p>
            </div>
          </div>

          {/* About Section */}
          {mentor.about && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                About Me
              </h4>
              {mentor.about.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Academic Information */}
          {mentor.academicBackground && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Academic Background
              </h4>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Major:</span>{" "}
                  {mentor.academicBackground.major}
                </p>
                <p>
                  <span className="font-medium">Current Semester:</span>{" "}
                  {mentor.academicBackground.currentSemester}
                </p>
                <p>
                  <span className="font-medium">Focus Areas:</span>{" "}
                  {mentor.academicBackground.focusAreas}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {mentor.academicBackground.experience}
                </p>
              </div>
            </div>
          )}

          {/* Personal Information */}
          {mentor.personalInfo && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Personal Information
              </h4>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Languages:</span>{" "}
                  {mentor.personalInfo.languages}
                </p>
                <p>
                  <span className="font-medium">Nationality:</span>{" "}
                  {mentor.personalInfo.nationality}
                </p>
                <p>
                  <span className="font-medium">Hobbies:</span>{" "}
                  {mentor.personalInfo.hobbies}
                </p>
              </div>
            </div>
          )}

          {/* Mentorship Focus */}
          {mentor.mentorshipFocus && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Mentorship Focus
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Who I Can Help:
                  </p>
                  <p className="text-gray-700">
                    {mentor.mentorshipFocus.whoCanHelp}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    Topics I&apos;m Comfortable With:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {mentor.mentorshipFocus.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Request Button */}
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <button
              onClick={onRequestMentor}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request {mentor.name.split(" ")[0]} as Your Mentor
            </button>
            <p className="text-sm text-gray-600 mt-3">
              You are not committing permanently. Mentoring can be stopped at any
              time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

