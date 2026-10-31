import { requireRole } from "@/lib/auth/session";
import { Header } from "@/components/layout/Header";

export default async function OgrenciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("student");

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header displayName={profile.display_name} avatar={profile.avatar} />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
