"use client";

import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDeleteDialog({
  trigger,
  title,
  description,
  onConfirm,
}: {
  trigger: ReactElement;
  title: string;
  description: string;
  onConfirm: () => Promise<{ error?: string } | void>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Vazgeç</DialogClose>
          <Button
            variant="destructive"
            disabled={pending}
            onClick={async () => {
              setPending(true);
              const result = await onConfirm();
              setPending(false);
              if (result?.error) {
                toast.error(result.error);
                return;
              }
              toast.success("Silindi");
              setOpen(false);
              router.refresh();
            }}
          >
            {pending ? "Siliniyor…" : "Sil"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
