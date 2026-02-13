import { Search, User, Mail, HeartHandshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      color: "blue",
      title: "Browse Mentors",
      description:
        "Explore available mentors and use filters to find someone who matches your needs.",
    },
    {
      icon: User,
      color: "indigo",
      title: "View Profile",
      description:
        "Open a mentor profile to learn about their background, interests, and mentorship focus.",
    },
    {
      icon: Mail,
      color: "purple",
      title: "Request Mentor",
      description:
        "Follow the instructions to send a mentoring request via email to the student representative.",
    },
    {
      icon: HeartHandshake,
      color: "green",
      title: "Start Mentoring",
      description:
        "Begin your mentoring relationship for the semester and connect with your mentor.",
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
  };

  return (
    <section className="mb-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            How Mentoring Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started with mentoring is simple and straightforward. Follow
            these easy steps to connect with your mentor.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const colors = colorClasses[step.color];
            return (
              <div key={step.title} className="text-center">
                <div
                  className={`w-14 h-14 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 bg-blue-50 inline-block px-4 py-2 rounded-lg">
            Mentorship typically lasts one semester and can be extended by mutual
            agreement.
          </p>
        </div>
      </div>
    </section>
  );
}

