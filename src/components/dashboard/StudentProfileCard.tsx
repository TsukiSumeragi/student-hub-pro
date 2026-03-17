import { useState } from "react";
import { Mail, Pen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { ChangePasswordDialog } from "@/components/profile/ChangePasswordDialog";
import avatarImg from "@/assets/avatar-azzahra.jpg";

export function StudentProfileCard() {
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  return (
    <>
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

      <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />
      <ChangePasswordDialog open={passOpen} onOpenChange={setPassOpen} />
    </>
  );
}
