import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!current) e.current = "Current password is required";
    if (!newPass) e.newPass = "New password is required";
    else if (newPass.length < 8) e.newPass = "Must be at least 8 characters";
    if (newPass !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setCurrent(""); setNewPass(""); setConfirm("");
    onOpenChange(false);
    toast({ title: "Password changed 🔒", description: "Your password has been updated securely." });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
            {errors.current && <p className="text-xs text-destructive">{errors.current}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newpass">New Password</Label>
            <Input id="newpass" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
            {errors.newPass && <p className="text-xs text-destructive">{errors.newPass}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : "Update Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
