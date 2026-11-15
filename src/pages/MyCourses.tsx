import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { CourseCard } from "@/components/dashboard/CourseCard";
import { useUIStore } from "@/store/useUIStore";
import { useCourseStore } from "@/store/useCourseStore";

const MyCourses = () => {
  const theme = useUIStore((s) => s.theme);
  const courses = useCourseStore((s) => s.courses).filter((c) => c.enrolled);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "My Courses" }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">My Courses</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Track your progress across {courses.length} enrolled courses
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
              {courses.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg font-medium">No courses enrolled yet</p>
                  <p className="text-sm mt-1">Head to the Course Catalog to get started!</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MyCourses;
