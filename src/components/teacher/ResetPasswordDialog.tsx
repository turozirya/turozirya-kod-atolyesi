"use client";

import { useState, type ReactElement } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { resetStudentPassword } from "@/actions/students";

export function ResetPasswordDialog({
  studentId,
  studentName,
  trigger,
}: {
  studentId: string;
  studentName: string;
  trigger: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const confirm = async () => {
    setPending(true);
    const result = await resetStudentPassword(studentId);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    setPassword(result.password ?? null);
  };

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // kopyalama başarısızsa kullanıcı şifreyi elle seçip kopyalayabilir
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setPassword(null);
          setCopied(false);
        }
      }}
    >
      <DialogTrigger render={trigger} />
      <DialogContent>
        {password ? (
          <>
            <DialogHeader>
              <DialogTitle>Yeni şifre oluşturuldu</DialogTitle>
              <DialogDescription>
                Bu şifre yalnızca burada gösteriliyor, bir daha göremeyeceksin — şimdi not al.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-dashed p-4">
              <span className="font-mono text-lg font-bold">{password}</span>
              <Button variant="ghost" size="icon-sm" onClick={copy} aria-label="Şifreyi kopyala">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Şifre sıfırlansın mı?</DialogTitle>
              <DialogDescription>
                {studentName} için yeni bir şifre üretilecek, eski şifresi geçersiz olacak.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button disabled={pending} onClick={confirm}>
                {pending ? "Sıfırlanıyor…" : "Şifreyi Sıfırla"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
