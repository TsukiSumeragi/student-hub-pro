import { BookOpen, CreditCard, TrendingUp, CalendarClock } from "lucide-react";

const stats = [
  { label: "Total Credits", value: "72", icon: CreditCard, color: "text-primary" },
  { label: "Enrolled Courses", value: "3", icon: BookOpen, color: "text-accent" },
  { label: "Current GPA", value: "3.74", icon: TrendingUp, color: "text-primary" },
  { label: "Upcoming Deadlines", value: "5", icon: CalendarClock, color: "text-accent" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-card rounded-xl card-shadow p-5 flex items-center gap-4 hover:card-shadow-hover transition-shadow duration-200"
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
  );
}
