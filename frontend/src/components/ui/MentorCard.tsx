import Image from "next/image";
import { Mentor } from "@/types/mentor";

interface MentorCardProps {
  mentor: Mentor;
  onClick: () => void;
}

export default function MentorCard({ mentor, onClick }: MentorCardProps) {
  return (
    <div
      className="mentor-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-transform duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-md"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={mentor.image}
            alt={mentor.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{mentor.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {mentor.major}, Semester {mentor.semester}
            </p>
            <div className="flex flex-wrap gap-1">
              {mentor.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {mentor.flag} {mentor.nationality}
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Profile →
          </button>
        </div>
      </div>
    </div>
  );
}

