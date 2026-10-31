"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Award, BookOpen, Home, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/panel", label: "Panel", icon: Home },
  { href: "/dersler", label: "Dersler", icon: BookOpen },
  { href: "/rozetler", label: "Rozetler", icon: Award },
  { href: "/siralama", label: "Sıralama", icon: Trophy },
  { href: "/profil", label: "Profil", icon: User },
] as const;

export function StudentNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden items-center gap-1 border-b bg-card px-4 sm:flex sm:px-6">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <nav
        aria-label="Alt gezinme"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t bg-card py-1.5 sm:hidden"
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                "flex min-w-11 flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
