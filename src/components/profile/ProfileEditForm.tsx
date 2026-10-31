"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AvatarPicker } from "@/components/avatar-picker";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";
import { updateProfile } from "@/actions/profile";

export function ProfileEditForm({
  displayName,
  avatar,
}: {
  displayName: string;
  avatar: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName, avatar },
  });

  const selectedAvatar = useWatch({ control, name: "avatar" });

  const onSubmit = async (data: ProfileInput) => {
    setSubmitting(true);
    const result = await updateProfile(data);
    setSubmitting(false);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Profil güncellendi");
    router.refresh();
  };

  return (
    <Card className="flex flex-col gap-4 rounded-2xl p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-display-name">Görünen ad</Label>
          <Input id="profile-display-name" {...register("displayName")} />
          {errors.displayName && (
            <p className="text-sm text-destructive">{errors.displayName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Avatar</Label>
          <AvatarPicker
            value={selectedAvatar}
            onChange={(value) => setValue("avatar", value)}
          />
        </div>

        <Button type="submit" disabled={submitting} className="h-11 rounded-2xl font-bold">
          {submitting ? "Kaydediliyor…" : "Kaydet"}
        </Button>
      </form>
    </Card>
  );
}
