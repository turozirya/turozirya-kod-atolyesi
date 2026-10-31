"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addBonusPoints } from "@/actions/students";

export function BonusPointsDialog({
  studentId,
  studentName,
  trigger,
}: {
  studentId: string;
  studentName: string;
  trigger: ReactElement;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  const confirm = async () => {
    const parsedAmount = Number(amount);
    if (!Number.isInteger(parsedAmount) || parsedAmount <= 0) {
      toast.error("Geçerli bir puan miktarı gir.");
      return;
    }
    setPending(true);
    const result = await addBonusPoints(studentId, parsedAmount, note);
    setPending(false);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(`+${parsedAmount} puan verildi`);
    setOpen(false);
    setAmount("");
    setNote("");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bonus puan ver</DialogTitle>
          <DialogDescription>{studentName} için ek puan ekle.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bonus-amount">Puan</Label>
            <Input
              id="bonus-amount"
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bonus-note">Not (opsiyonel)</Label>
            <Textarea
              id="bonus-note"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <Button disabled={pending} onClick={confirm} className="h-11 rounded-xl font-bold">
            {pending ? "Veriliyor…" : "Puanı Ver"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
