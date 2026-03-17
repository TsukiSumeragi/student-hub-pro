import courseLaravel from "@/assets/course-laravel.jpg";
import courseReact from "@/assets/course-react.jpg";
import courseDatabase from "@/assets/course-database.jpg";

export interface Course {
  id: string;
  title: string;
  description: string;
  mentor: string;
  progress: number;
  lectures: number;
  joined: string;
  image: string;
  credits: number;
  grade: number; // 0-4 scale
  category: string;
  enrolled: boolean;
}

export const allCourses: Course[] = [
  {
    id: "c1a2b3d4-e5f6-7890-abcd-ef1234567890",
    title: "Laravel buat pemula",
    description: "Belajar framework Laravel dari dasar hingga membuat aplikasi web lengkap dengan authentication dan CRUD.",
    mentor: "Zara si developer smt 4",
    progress: 15,
    lectures: 15,
    joined: "Oct '23",
    image: courseLaravel,
    credits: 3,
    grade: 3.5,
    category: "Backend",
    enrolled: true,
  },
  {
    id: "d2e3f4a5-b6c7-8901-cdef-234567890abc",
    title: "React & Modern Frontend",
    description: "Master React.js, hooks, state management, and build production-ready single-page applications.",
    mentor: "Ahmad Rizki",
    progress: 42,
    lectures: 22,
    joined: "Nov '23",
    image: courseReact,
    credits: 4,
    grade: 3.8,
    category: "Frontend",
    enrolled: true,
  },
  {
    id: "e3f4a5b6-c7d8-9012-efab-34567890cdef",
    title: "Database Design & SQL",
    description: "Learn relational database design, normalization, complex SQL queries, and performance optimization.",
    mentor: "Dr. Siti Nurhaliza",
    progress: 68,
    lectures: 18,
    joined: "Sep '23",
    image: courseDatabase,
    credits: 3,
    grade: 3.9,
    category: "Database",
    enrolled: true,
  },
  {
    id: "f4a5b6c7-d8e9-0123-abcd-4567890defab",
    title: "UI/UX Design Fundamentals",
    description: "Learn design thinking, wireframing, prototyping, and user research to create intuitive digital experiences.",
    mentor: "Maya Putri",
    progress: 0,
    lectures: 20,
    joined: "",
    image: courseLaravel,
    credits: 3,
    grade: 0,
    category: "Design",
    enrolled: false,
  },
  {
    id: "a5b6c7d8-e9f0-1234-cdef-567890abcdef",
    title: "Cloud Computing with AWS",
    description: "Deploy, scale, and manage applications on Amazon Web Services. Covers EC2, S3, Lambda, and more.",
    mentor: "Budi Santoso",
    progress: 0,
    lectures: 25,
    joined: "",
    image: courseReact,
    credits: 4,
    grade: 0,
    category: "DevOps",
    enrolled: false,
  },
  {
    id: "b6c7d8e9-f0a1-2345-efab-67890abcdef1",
    title: "Machine Learning Basics",
    description: "Introduction to supervised and unsupervised learning, neural networks, and practical Python ML projects.",
    mentor: "Prof. Hendra",
    progress: 0,
    lectures: 30,
    joined: "",
    image: courseDatabase,
    credits: 4,
    grade: 0,
    category: "AI/ML",
    enrolled: false,
  },
  {
    id: "c7d8e9f0-a1b2-3456-abcd-7890abcdef12",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native with real-world project experience.",
    mentor: "Dewi Lestari",
    progress: 0,
    lectures: 24,
    joined: "",
    image: courseLaravel,
    credits: 3,
    grade: 0,
    category: "Mobile",
    enrolled: false,
  },
];

export function getEnrolledCourses() {
  return allCourses.filter(c => c.enrolled);
}

export function getCatalogCourses() {
  return allCourses.filter(c => !c.enrolled);
}

export function calculateStats(courses: Course[]) {
  const enrolled = courses.filter(c => c.enrolled);
  const totalCredits = enrolled.reduce((sum, c) => sum + c.credits, 0);
  const gradedCourses = enrolled.filter(c => c.grade > 0);
  const gpa = gradedCourses.length > 0
    ? gradedCourses.reduce((sum, c) => sum + c.grade * c.credits, 0) / gradedCourses.reduce((sum, c) => sum + c.credits, 0)
    : 0;
  const upcomingDeadlines = enrolled.filter(c => c.progress < 100).length;
  return {
    totalCredits,
    enrolledCount: enrolled.length,
    gpa: Math.round(gpa * 100) / 100,
    upcomingDeadlines,
  };
}
