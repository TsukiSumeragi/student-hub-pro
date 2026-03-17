import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { StudentProfileCard } from "@/components/dashboard/StudentProfileCard";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { useUIStore } from "@/store/useUIStore";
import { useCourseStore } from "@/store/useCourseStore";
import { calculateStats } from "@/data/courses-data";
import { BookOpen, CreditCard, TrendingUp, CalendarClock } from "lucide-react";

const Index = () => {
  const theme = useUIStore((s) => s.theme);
  const courses = useCourseStore((s) => s.courses);
  const stats = calculateStats(courses);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const statCards = [
    { label: "Total Credits", value: String(stats.totalCredits), icon: CreditCard, color: "text-primary" },
    { label: "Enrolled Courses", value: String(stats.enrolledCount), icon: BookOpen, color: "text-primary" },
    { label: "Current GPA", value: stats.gpa.toFixed(2), icon: TrendingUp, color: "text-primary" },
    { label: "Upcoming Deadlines", value: String(stats.upcomingDeadlines), icon: CalendarClock, color: "text-primary" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: "Dashboard" }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">My Student Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Welcome back, Azzahra!</p>
              </div>
              <StudentProfileCard />
              {/* Dynamic Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s) => (
                  <div
                    key={s.label}
                    className="bg-card rounded-xl border border-border p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className={`w-11 h-11 rounded-lg bg-secondary flex items-center justify-center ${s.color}`}>
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <CoursesSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
