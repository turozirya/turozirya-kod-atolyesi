"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/actions/auth";
import { LevelBar } from "@/components/gamification/LevelBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header({
  displayName,
  avatar,
  menu,
  points,
  profileHref,
  announcementsHref,
  homeHref = "/",
}: {
  displayName: string;
  avatar: string;
  menu?: React.ReactNode;
  points?: number;
  profileHref?: string;
  announcementsHref?: string;
  homeHref?: string;
}) {
  return (
    <header className="flex items-center justify-between gap-3 border-b bg-card px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        {menu}
        <Link href={homeHref} className="truncate font-heading text-lg font-bold text-foreground">
          Turozirya Kod Atölyesi
        </Link>
      </div>
      {typeof points === "number" && (
        <LevelBar points={points} variant="compact" className="hidden sm:flex" />
      )}
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <DropdownMenu>
        <DropdownMenuTrigger className="flex h-11 items-center gap-2 rounded-full px-1.5">
          <Image
            src={`/avatars/${avatar}.svg`}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full bg-secondary"
          />
          <span className="hidden text-sm font-medium sm:inline">
            {displayName}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {profileHref && (
            <DropdownMenuItem render={<Link href={profileHref} />}>
              Profil
            </DropdownMenuItem>
          )}
          {announcementsHref && (
            <DropdownMenuItem render={<Link href={announcementsHref} />}>
              Duyurular
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => signOut()}>Çıkış</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
