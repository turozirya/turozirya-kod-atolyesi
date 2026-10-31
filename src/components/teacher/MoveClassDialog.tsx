"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { moveStudentClass } from "@/actions/students";

export function MoveClassDialog({
  studentId,
  studentName,
  otherClasses,
  trigger,
}: {
  studentId: string;
  studentName: string;
  otherClasses: { id: string; name: string }[];
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [pending, setPending] = useState(false);

  const confirm = async () => {
    if (!targetId) return;
    setPending(true);
    const result = await moveStudentClass(studentId, targetId);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Öğrenci taşındı");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Başka sınıfa taşı</DialogTitle>
          <DialogDescription>
            {studentName} için hedef sınıfı seç.
          </DialogDescription>
        </DialogHeader>

        {otherClasses.length === 0 ? (
          <p className="text-sm text-muted-foreground">Başka sınıfın yok.</p>
        ) : (
          <Select value={targetId} onValueChange={(value) => setTargetId(value ?? "")}>
            <SelectTrigger className="w-full">
              <SelectValue>
                {(value: string | null) =>
                  otherClasses.find((c) => c.id === value)?.name ?? "Sınıf seç"
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {otherClasses.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <DialogFooter>
          <Button disabled={pending || !targetId} onClick={confirm}>
            {pending ? "Taşınıyor…" : "Taşı"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
