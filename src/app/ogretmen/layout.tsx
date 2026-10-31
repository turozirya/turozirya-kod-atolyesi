import { Menu } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { Header } from "@/components/layout/Header";
import { TeacherSidebar } from "@/components/layout/TeacherSidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default async function OgretmenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("teacher");

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header
        displayName={profile.display_name}
        avatar={profile.avatar}
        menu={
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" />
              }
            >
              <Menu />
              <span className="sr-only">Menüyü aç</span>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Öğretmen Menüsü</SheetTitle>
              </SheetHeader>
              <TeacherSidebar />
            </SheetContent>
          </Sheet>
        }
      />
      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 border-r bg-card md:block">
          <TeacherSidebar />
        </aside>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
