import { CourseCard } from "./CourseCard";
import courseLaravel from "@/assets/course-laravel.jpg";
import courseReact from "@/assets/course-react.jpg";
import courseDatabase from "@/assets/course-database.jpg";

const courses = [
  {
    title: "Laravel buat pemula",
    description: "Belajar framework Laravel dari dasar hingga membuat aplikasi web lengkap dengan authentication dan CRUD.",
    mentor: "Zara si developer smt 4",
    progress: 15,
    lectures: 15,
    joined: "Oct '23",
    image: courseLaravel,
  },
  {
    title: "React & Modern Frontend",
    description: "Master React.js, hooks, state management, and build production-ready single-page applications.",
    mentor: "Ahmad Rizki",
    progress: 42,
    lectures: 22,
    joined: "Nov '23",
    image: courseReact,
  },
  {
    title: "Database Design & SQL",
    description: "Learn relational database design, normalization, complex SQL queries, and performance optimization.",
    mentor: "Dr. Siti Nurhaliza",
    progress: 68,
    lectures: 18,
    joined: "Sep '23",
    image: courseDatabase,
  },
];

export function CoursesSection() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">My Active Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>
    </section>
  );
}
