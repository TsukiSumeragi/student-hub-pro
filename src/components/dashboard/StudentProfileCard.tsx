import { Mail, Pen, Lock } from "lucide-react";
import avatarImg from "@/assets/avatar-azzahra.jpg";

export function StudentProfileCard() {
  return (
    <div className="bg-card rounded-xl card-shadow p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
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
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-150">
          <Pen className="w-3.5 h-3.5" />
          Edit Profile
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors duration-150">
          <Lock className="w-3.5 h-3.5" />
          Change Password
        </button>
      </div>
    </div>
  );
}
