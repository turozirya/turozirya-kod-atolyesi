import { requireProfile } from "@/lib/auth/session";
import { Header } from "@/components/layout/Header";
import { StudentNav } from "@/components/layout/StudentNav";

export default async function OgrenciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireProfile();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header displayName={profile.display_name} avatar={profile.avatar} />
      <StudentNav />
      <main className="flex flex-1 flex-col pb-16 sm:pb-0">{children}</main>
    </div>
  );
}
