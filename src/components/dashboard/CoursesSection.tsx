import { CourseCard } from "./CourseCard";
import { useCourseStore } from "@/store/useCourseStore";

export function CoursesSection() {
  const courses = useCourseStore((s) => s.courses.filter((c) => c.enrolled));

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">My Active Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
