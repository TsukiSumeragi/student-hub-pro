import { useState, useEffect } from "react";
import { Search, BookOpen, Calendar, Loader2, Filter } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUIStore } from "@/store/useUIStore";
import { useCourseStore } from "@/store/useCourseStore";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "@/hooks/use-toast";

const CourseCatalog = () => {
  const theme = useUIStore((s) => s.theme);
  const { courses, enrollCourse } = useCourseStore();
  const catalogCourses = courses.filter((c) => !c.enrolled);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const categories = [...new Set(courses.map((c) => c.category))];

  const filtered = catalogCourses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      c.mentor.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchCategory = !categoryFilter || c.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleEnroll = async (courseId: string) => {
    setLoadingId(courseId);
    // Mock API call — replace with: apiFetch('/enroll', { method: 'POST', body: JSON.stringify({ student_id: 1, course_id: courseId }) })
    await new Promise((r) => setTimeout(r, 1200));
    enrollCourse(courseId);
    setLoadingId(null);
    toast({
      title: "Enrolled successfully! 🎉",
      description: "The course has been added to your list.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Course Catalog" }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Course Catalog</h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Discover and enroll in new courses
                </p>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses, mentors..."
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Button
                    variant={categoryFilter === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter(null)}
                  >
                    All
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={categoryFilter === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Course Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-foreground leading-tight">
                          {course.title}
                        </h3>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {course.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Mentor: <span className="font-medium text-foreground">{course.mentor}</span>
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {course.lectures} Lectures
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {course.credits} Credits
                        </span>
                      </div>
                      <Button
                        onClick={() => handleEnroll(course.id)}
                        disabled={loadingId === course.id}
                        className="w-full mt-2"
                      >
                        {loadingId === course.id ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Enrolling...
                          </>
                        ) : (
                          "Enroll Now"
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <p className="text-lg font-medium">No courses found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CourseCatalog;
