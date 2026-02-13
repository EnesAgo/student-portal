"use client";

import { X, Info, Copy, ShieldCheck } from "lucide-react";
import { Mentor } from "@/types/mentor";
import { useEffect, useState } from "react";

interface RequestModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestModal({
  mentor,
  isOpen,
  onClose,
}: RequestModalProps) {
  const [copied, setCopied] = useState(false);

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

  const emailTemplate = `To: mentoring@university.edu
CC: ${mentor.email}
Subject: Mentoring Request - ${mentor.name}

Dear Student Representative,

I would like to request ${mentor.name} as my mentor for this semester.

My name is [Your Name], and I am a [Year/Semester] student studying [Your Major].

I am interested in connecting with ${mentor.name.split(" ")[0]} because [brief reason - e.g., "I'm also an international student and would appreciate guidance on academic transition"].

Thank you for facilitating this connection.

Best regards,
[Your Name]`;

  const copyEmailTemplate = () => {
    navigator.clipboard.writeText(emailTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openEmailClient = () => {
    const subject = encodeURIComponent(`Mentoring Request - ${mentor.name}`);
    const cc = encodeURIComponent(mentor.email || "");
    window.location.href = `mailto:mentoring@university.edu?cc=${cc}&subject=${subject}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Request a Mentor
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How Mentoring Requests Work
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Mentoring requests are currently handled manually to ensure the
                  best match for both students and mentors. This process is simple
                  and personal.
                </p>
                <p className="text-sm text-gray-700">
                  You are not committing permanently. You can stop mentoring at any
                  time, and mentoring typically lasts one semester.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">
              Steps to Request {mentor.name}:
            </h3>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span>
                  Send an email to the student representative at{" "}
                  <span className="font-medium text-blue-600">
                    mentoring@university.edu
                  </span>
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </span>
                <span>
                  Include the mentor&apos;s name ({mentor.name}) and your basic
                  information
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </span>
                <span>
                  CC the mentor at{" "}
                  <span className="font-medium text-blue-600">
                    {mentor.email}
                  </span>
                </span>
              </li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Email Template</h3>
              <button
                onClick={copyEmailTemplate}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-sm text-gray-700 font-mono leading-relaxed whitespace-pre-wrap">
              {emailTemplate}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium text-gray-900 mb-1">Remember:</p>
                <ul className="space-y-1">
                  <li>• You are not committing permanently</li>
                  <li>• You can stop mentoring at any time</li>
                  <li>• Mentoring usually lasts one semester</li>
                  <li>• This is a supportive, flexible relationship</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openEmailClient}
              className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open Email Client
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

