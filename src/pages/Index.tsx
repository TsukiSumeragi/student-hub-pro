import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StudentProfileCard } from "@/components/dashboard/StudentProfileCard";
import { CoursesSection } from "@/components/dashboard/CoursesSection";
import { useUIStore } from "@/store/useUIStore";

const Index = () => {
  const theme = useUIStore(s => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: 'Dashboard' }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[1440px] mx-auto px-6 py-6 space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">My Student Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-0.5">Welcome back, Azzahra!</p>
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
