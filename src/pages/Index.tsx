import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { StudentProfileCard } from "@/components/dashboard/StudentProfileCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CoursesSection } from "@/components/dashboard/CoursesSection";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-8 space-y-8">
              {/* Page header */}
              <div>
                <h1 className="text-2xl font-semibold text-foreground">My Student Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Welcome back, Azzahra! 👋</p>
              </div>

              <StudentProfileCard />
              <StatsCards />
              <CoursesSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
