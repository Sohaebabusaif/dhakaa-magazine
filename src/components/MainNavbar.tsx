import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import SearchBar from "./SearchBar";
import CurrentDate from "./CurrentDate";
import { client } from "../sanity/client";

interface Category {
  title: string;
  slug: { current: string };
  order: number;
}

export default async function MainNavbar({ backLink }: { backLink?: { href: string, label: string } }) {
  const categories = await client.fetch<Category[]>(`*[_type == "category"] | order(order asc)`);

  return (
    <>
      {/* ══ TOP BAR (Desktop Only) ══ */}
      <div className="hidden lg:block bg-black/90 text-dhakaa-secondary/80 border-b border-white/10 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>الإصدار اليومي المتجدد</span>
            <span className="opacity-50">|</span>
            <CurrentDate />
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* ══ NAVBAR (Sticky) ══ */}
      <nav className="sticky top-0 z-50 bg-dhakaa-dark text-dhakaa-secondary shadow-xl border-b border-dhakaa-primary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Right: Menu & Search (Mobile) - Only show if no back link */}
            {!backLink && (
              <div className="flex lg:hidden items-center gap-4">
                <button><Menu size={20} /></button>
                <button><Search size={20} /></button>
              </div>
            )}

            {/* Center/Right: Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <Image src="/logo.png" alt="HGA DHAKAA Logo" width={40} height={40} className="object-contain w-auto h-auto" priority />
                <div className="flex flex-col">
                  <div className="text-xl font-black tracking-widest group-hover:text-dhakaa-primary transition-colors">
                    ذكاء الباب العالي
                  </div>
                  <div className="text-[9px] tracking-[4px] text-dhakaa-primary font-bold hidden lg:block">HGA DHAKAA</div>
                </div>
              </Link>
            </div>

            {/* Left: Desktop Tabs */}
            <div className="hidden lg:flex items-center gap-2 text-sm font-bold">
              {backLink ? (
                <Link href={backLink.href} className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
                  {backLink.label}
                </Link>
              ) : (
                <>
                  <Link href="/" className="px-4 py-2 bg-dhakaa-primary text-dhakaa-bg rounded-lg">الرئيسية</Link>
                  {categories.map(cat => (
                    <Link key={cat.slug.current} href={`/category/${cat.slug.current}`} className="px-3 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors">
                      {cat.title}
                    </Link>
                  ))}
                  <Link href="/archive" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors text-dhakaa-primary">الأرشيف</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
