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

export function Header({
  displayName,
  avatar,
  menu,
}: {
  displayName: string;
  avatar: string;
  menu?: React.ReactNode;
}) {
  return (
    <header className="flex items-center justify-between border-b bg-card px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        {menu}
        <Link href="/" className="font-heading text-lg font-bold text-foreground">
          Turozirya Kod Atölyesi
        </Link>
      </div>
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
          <DropdownMenuItem render={<Link href="/profil" />}>
            Profil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Çıkış</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
