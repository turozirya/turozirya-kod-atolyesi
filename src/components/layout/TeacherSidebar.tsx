"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, BarChart3, BookOpen, Home, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/ogretmen", label: "Özet", icon: Home },
  { href: "/ogretmen/kurslar", label: "Kurslar", icon: BookOpen },
  { href: "/ogretmen/siniflar", label: "Sınıflar", icon: Users },
  { href: "/ogretmen/ilerleme", label: "İlerleme", icon: BarChart3 },
  { href: "/ogretmen/rozetler", label: "Rozetler", icon: Award },
] as const;

export function TeacherSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/ogretmen" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
