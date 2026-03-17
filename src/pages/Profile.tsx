import { useState, useEffect } from "react";
import { Mail, Pen, Lock, GraduationCap, Calendar, CreditCard } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/useUIStore";
import { useCourseStore } from "@/store/useCourseStore";
import { calculateStats } from "@/data/courses-data";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { ChangePasswordDialog } from "@/components/profile/ChangePasswordDialog";
import avatarImg from "@/assets/avatar-azzahra.jpg";

const Profile = () => {
  const theme = useUIStore((s) => s.theme);
  const courses = useCourseStore((s) => s.courses);
  const stats = calculateStats(courses);
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNavbar breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Profile" }]} />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-[900px] mx-auto px-6 py-6 space-y-6">
              <h1 className="text-xl font-semibold text-foreground">My Profile</h1>

              {/* Profile Card */}
              <div className="bg-card rounded-xl border border-border p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={avatarImg}
                  alt="Azzahra"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-secondary flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-foreground">Azzahra</h2>
                  <p className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-muted-foreground mt-1">
                    <Mail className="w-4 h-4" />
                    azzahraasabri@gmail.com
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Software Engineering</p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Semester 4
                  </span>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" onClick={() => setEditOpen(true)}>
                    <Pen className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setPassOpen(true)}>
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Change Password
                  </Button>
                </div>
              </div>

              {/* Academic Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Total Credits", value: stats.totalCredits, icon: CreditCard },
                  { label: "Enrolled Courses", value: stats.enrolledCount, icon: GraduationCap },
                  { label: "Current GPA", value: stats.gpa.toFixed(2), icon: Calendar },
                  { label: "Deadlines", value: stats.upcomingDeadlines, icon: Calendar },
                ].map((s) => (
                  <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <s.icon className="w-5 h-5 mx-auto text-primary mb-2" />
                    <p className="text-2xl font-semibold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Enrolled Courses List */}
              <div>
                <h3 className="text-base font-semibold text-foreground mb-3">Enrolled Courses</h3>
                <div className="space-y-3">
                  {courses.filter(c => c.enrolled).map((c) => (
                    <div key={c.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
                      <img src={c.image} alt={c.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{c.title}</p>
                        <p className="text-xs text-muted-foreground">{c.mentor} · {c.credits} credits</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-foreground">{c.progress}%</p>
                        <div className="w-20 h-1.5 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
      <ChangePasswordDialog open={passOpen} onOpenChange={setPassOpen} />
    </SidebarProvider>
  );
};

export default Profile;
