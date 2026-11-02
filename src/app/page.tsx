import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const OZELLIKLER = [
  {
    baslik: "Gerçek Projeler",
    aciklama: "Robotikten micro:bit'e, LED yakmaktan oyun yapmaya kadar adım adım öğren.",
    avatar: "/avatars/robot-2.svg",
  },
  {
    baslik: "Rozetler ve Puanlar",
    aciklama: "Her tamamladığın ders seni yeni bir seviyeye taşır.",
    avatar: "/avatars/robot-7.svg",
  },
  {
    baslik: "Kaldığın Yerden Devam",
    aciklama: "Yarım bıraktığın dersi bulmak için hiç zaman kaybetme.",
    avatar: "/avatars/robot-4.svg",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-background px-4 py-10 sm:px-8">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center gap-10 text-center">
        <Image
          src="/avatars/robot-1.svg"
          alt=""
          width={96}
          height={96}
          className="h-24 w-24"
          priority
        />

        <div className="flex flex-col items-center gap-3">
          <h1 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Turozirya Kod Atölyesi
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Robotik ve kodlamayı adım adım öğren, rozetler topla, sınıfınla
            yarış! Turozirya Kod Atölyesi&apos;nin eğlenceli öğrenme platformu.
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Button
            render={<Link href="/giris" />}
            nativeButton={false}
            size="lg"
            className="h-12 w-full rounded-2xl text-base font-bold shadow-sm sm:w-auto sm:flex-1"
          >
            Giriş Yap
          </Button>
          <Button
            render={<Link href="/kayit" />}
            nativeButton={false}
            variant="secondary"
            size="lg"
            className="h-12 w-full rounded-2xl text-base font-bold shadow-sm sm:w-auto sm:flex-1"
          >
            Kayıt Ol
          </Button>
        </div>

        <div className="grid w-full gap-4 pt-6 sm:grid-cols-3">
          {OZELLIKLER.map((ozellik) => (
            <Card
              key={ozellik.baslik}
              className="flex flex-col items-center gap-2 rounded-2xl p-5 text-center shadow-sm"
            >
              <Image
                src={ozellik.avatar}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14"
              />
              <h2 className="font-heading text-base font-bold text-foreground">
                {ozellik.baslik}
              </h2>
              <p className="text-sm text-muted-foreground">
                {ozellik.aciklama}
              </p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
