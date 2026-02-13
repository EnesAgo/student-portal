import { Mentor } from "@/types/mentor";

export const mentors: Mentor[] = [
  {
    id: "sarah",
    name: "Sarah Chen",
    major: "Software Engineering",
    semester: 5,
    languages: ["English", "German"],
    nationality: "Germany",
    flag: "🇩🇪",
    bio: "International student from Germany. Happy to help with academic transition, coding projects, and campus life.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    email: "sarah.chen@student.university.edu",
    about: [
      "Hi! I'm Sarah, an international student from Germany currently in my fifth semester studying Software Engineering. I remember how overwhelming it was when I first arrived, so I joined the mentoring program to help make your transition smoother.",
      "I'm passionate about coding, problem-solving, and building connections across cultures. Outside of academics, I enjoy photography, hiking, and exploring local coffee shops. I'm here to support you academically and help you feel at home on campus."
    ],
    academicBackground: {
      major: "Software Engineering",
      currentSemester: 5,
      focusAreas: "Software Development, Web Applications, Cloud Computing",
      experience: "Teaching Assistant for Intro to Programming, Member of Coding Club"
    },
    personalInfo: {
      languages: "English (Fluent), German (Native)",
      nationality: "Germany",
      hobbies: "Photography, Hiking, Coffee tasting, Reading tech blogs"
    },
    mentorshipFocus: {
      whoCanHelp: "First-year students, international students, students in Software Engineering or related majors, anyone feeling overwhelmed by university life",
      topics: [
        "Academic transition and study strategies",
        "Programming help and coding projects",
        "Navigating campus resources",
        "Cultural adjustment and making friends",
        "Time management and work-life balance"
      ]
    }
  },
  {
    id: "marcus",
    name: "Mehmet Yılmaz",
    major: "Cyber Security",
    semester: 6,
    languages: ["Turkish", "English", "German"],
    nationality: "Turkey",
    flag: "🇹🇷",
    bio: "Passionate about cybersecurity and ethical hacking. Can help with security fundamentals and technical problem-solving.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    email: "mehmet.yilmaz@student.university.edu",
    about: [
      "Hello! I'm Mehmet, a Cyber Security student from Turkey in my sixth semester. I'm passionate about protecting digital systems and helping others understand the importance of security.",
      "I enjoy working on capture-the-flag competitions and sharing my knowledge with fellow students. Let me help you navigate the technical challenges of cybersecurity studies."
    ],
    academicBackground: {
      major: "Cyber Security",
      currentSemester: 6,
      focusAreas: "Network Security, Ethical Hacking, Cryptography",
      experience: "Security Club President, CTF Competition Participant"
    },
    personalInfo: {
      languages: "Turkish (Native), English (Fluent), German (Intermediate)",
      nationality: "Turkey",
      hobbies: "CTF competitions, Gaming, Technology podcasts"
    },
    mentorshipFocus: {
      whoCanHelp: "Students interested in cybersecurity, technical students, anyone wanting to improve their digital security knowledge",
      topics: [
        "Cybersecurity fundamentals",
        "Programming for security",
        "Study techniques for technical subjects",
        "Career planning in tech",
        "Networking and professional development"
      ]
    }
  },
  {
    id: "amara",
    name: "Amara Okafor",
    major: "Data Science And AI",
    semester: 4,
    languages: ["English", "Luganda"],
    nationality: "Uganda",
    flag: "🇺🇬",
    bio: "Experienced in data analysis and machine learning. Friendly and approachable. Can help with math, statistics, and programming.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
    email: "amara.okafor@student.university.edu",
    about: [
      "Hi! I'm Amara from Uganda, currently studying Data Science and AI. I love working with data and finding patterns that tell meaningful stories.",
      "I'm here to help you understand the fundamentals of data science, from statistics to machine learning. Don't hesitate to reach out!"
    ],
    academicBackground: {
      major: "Data Science And AI",
      currentSemester: 4,
      focusAreas: "Machine Learning, Data Visualization, Statistical Analysis",
      experience: "Research Assistant in AI Lab, Data Science Club Member"
    },
    personalInfo: {
      languages: "English (Fluent), Luganda (Native)",
      nationality: "Uganda",
      hobbies: "Data visualization, Reading research papers, Community outreach"
    },
    mentorshipFocus: {
      whoCanHelp: "First-year students, anyone interested in data science or AI, students struggling with math or statistics",
      topics: [
        "Data science fundamentals",
        "Python programming for data analysis",
        "Academic stress management",
        "Study strategies for STEM subjects",
        "Cultural adjustment and making friends"
      ]
    }
  },
  {
    id: "luca",
    name: "Luca Rossi",
    major: "Digital Industrial Engineering",
    semester: 7,
    languages: ["Italian", "English", "German"],
    nationality: "Italy",
    flag: "🇮🇹",
    bio: "Senior engineering student with experience in automation and Industry 4.0. Can help with technical courses and project management.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    email: "luca.rossi@student.university.edu",
    about: [
      "Ciao! I'm Luca from Italy, a Digital Industrial Engineering student in my seventh semester. I'm fascinated by how technology is transforming manufacturing and industry.",
      "I've worked on several Industry 4.0 projects and can help you understand the intersection of engineering, technology, and business."
    ],
    academicBackground: {
      major: "Digital Industrial Engineering",
      currentSemester: 7,
      focusAreas: "Automation, IoT, Process Optimization, Industry 4.0",
      experience: "Internship at Manufacturing Company, Engineering Society Member"
    },
    personalInfo: {
      languages: "Italian (Native), English (Fluent), German (Advanced)",
      nationality: "Italy",
      hobbies: "Robotics, 3D printing, Cycling, Italian cooking"
    },
    mentorshipFocus: {
      whoCanHelp: "Engineering students, anyone interested in automation or Industry 4.0, students looking for internship advice",
      topics: [
        "Engineering fundamentals",
        "Technical project management",
        "Internship and career planning",
        "Research and lab work",
        "Balancing academics and personal life"
      ]
    }
  },
  {
    id: "ana",
    name: "Ana Popescu",
    major: "Software Engineering",
    semester: 5,
    languages: ["Romanian", "English", "Italian"],
    nationality: "Romania",
    flag: "🇷🇴",
    bio: "Full-stack developer with strong study habits. Happy to help with web development and software engineering practices.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    email: "ana.popescu@student.university.edu",
    about: [
      "Hello! I'm Ana from Romania, studying Software Engineering. I love building web applications and learning new technologies.",
      "I'm passionate about helping others learn to code and navigate the challenges of software development studies."
    ],
    academicBackground: {
      major: "Software Engineering",
      currentSemester: 5,
      focusAreas: "Web Development, Mobile Apps, Database Design",
      experience: "Freelance Web Developer, Tech Meetup Organizer"
    },
    personalInfo: {
      languages: "Romanian (Native), English (Fluent), Italian (Intermediate)",
      nationality: "Romania",
      hobbies: "Web development, UX design, Travel, Language learning"
    },
    mentorshipFocus: {
      whoCanHelp: "Students learning to code, web development enthusiasts, anyone struggling with programming courses",
      topics: [
        "Web development (frontend and backend)",
        "Programming best practices",
        "Building a portfolio",
        "Time management for coding projects",
        "Navigating university resources"
      ]
    }
  },
  {
    id: "dmitri",
    name: "Dmitri Volkov",
    major: "Cyber Security",
    semester: 6,
    languages: ["Russian", "English", "German", "Latvian"],
    nationality: "Latvia",
    flag: "🇱🇻",
    bio: "Cybersecurity expert with focus on network security. Multilingual and experienced in helping international students.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    email: "dmitri.volkov@student.university.edu",
    about: [
      "Hi! I'm Dmitri from Latvia, studying Cyber Security. I speak multiple languages and understand the challenges of adapting to a new country.",
      "I'm here to help with technical subjects and cultural adjustment. Feel free to reach out in any of the languages I speak!"
    ],
    academicBackground: {
      major: "Cyber Security",
      currentSemester: 6,
      focusAreas: "Network Security, Penetration Testing, Security Auditing",
      experience: "Security Intern at Tech Company, International Student Association"
    },
    personalInfo: {
      languages: "Russian (Native), Latvian (Native), English (Fluent), German (Advanced)",
      nationality: "Latvia",
      hobbies: "Chess, Cybersecurity research, Languages, Gaming"
    },
    mentorshipFocus: {
      whoCanHelp: "International students, cybersecurity students, multilingual students, anyone feeling homesick",
      topics: [
        "Network security fundamentals",
        "Linux and command line",
        "Language barriers and communication",
        "Making international friends",
        "Dealing with culture shock"
      ]
    }
  },
  {
    id: "elena",
    name: "Elena Krasniqi",
    major: "Data Science And AI",
    semester: 4,
    languages: ["Albanian", "English", "Italian"],
    nationality: "Albania",
    flag: "🇦🇱",
    bio: "Data science student passionate about AI applications. Can help with mathematics, statistics, and machine learning basics.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    email: "elena.krasniqi@student.university.edu",
    about: [
      "Hi! I'm Elena from Albania, studying Data Science and AI. I'm fascinated by how AI can solve real-world problems.",
      "I love teaching and explaining complex concepts in simple ways. Let me help you succeed in your studies!"
    ],
    academicBackground: {
      major: "Data Science And AI",
      currentSemester: 4,
      focusAreas: "AI Applications, Natural Language Processing, Deep Learning",
      experience: "AI Research Project Participant, Math Tutor"
    },
    personalInfo: {
      languages: "Albanian (Native), English (Fluent), Italian (Advanced)",
      nationality: "Albania",
      hobbies: "AI experiments, Reading, Yoga, Cooking"
    },
    mentorshipFocus: {
      whoCanHelp: "Students struggling with math or programming, AI enthusiasts, first-year students",
      topics: [
        "Mathematics for data science",
        "Python programming",
        "Introduction to machine learning",
        "Study techniques for STEM",
        "Academic goal setting"
      ]
    }
  },
  {
    id: "marko",
    name: "Marko Dimitrovski",
    major: "Digital Industrial Engineering",
    semester: 5,
    languages: ["Macedonian", "English", "German"],
    nationality: "North Macedonia",
    flag: "🇲🇰",
    bio: "Engineering student with focus on smart manufacturing. Experienced in project work and team collaboration.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop",
    email: "marko.dimitrovski@student.university.edu",
    about: [
      "Hello! I'm Marko from North Macedonia, studying Digital Industrial Engineering. I'm interested in how digital technologies are reshaping industry.",
      "I enjoy working on interdisciplinary projects and can help you navigate the challenges of engineering studies."
    ],
    academicBackground: {
      major: "Digital Industrial Engineering",
      currentSemester: 5,
      focusAreas: "Smart Manufacturing, Digital Twins, Process Automation",
      experience: "Engineering Project Team Leader, CAD Software Workshop Instructor"
    },
    personalInfo: {
      languages: "Macedonian (Native), English (Fluent), German (Intermediate)",
      nationality: "North Macedonia",
      hobbies: "Engineering projects, Football, Photography, Travel"
    },
    mentorshipFocus: {
      whoCanHelp: "Engineering students, students interested in manufacturing, anyone needing help with technical projects",
      topics: [
        "Engineering project management",
        "CAD and technical software",
        "Team collaboration skills",
        "Internship preparation",
        "Work-study balance"
      ]
    }
  }
];

