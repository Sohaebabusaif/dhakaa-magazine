import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text pb-20">
      
      {/* Skeleton Navbar */}
      <nav className="sticky top-0 z-50 bg-dhakaa-dark text-dhakaa-secondary shadow-xl border-b border-dhakaa-primary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 opacity-50 animate-pulse">
              <Image src="/logo.png" alt="Loading" width={40} height={40} className="object-contain w-auto h-auto" />
              <div className="w-32 h-6 bg-dhakaa-secondary/20 rounded-md"></div>
            </div>
            <div className="hidden lg:flex px-4 py-2 bg-dhakaa-secondary/10 rounded-lg w-32 h-8 animate-pulse"></div>
          </div>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 lg:px-8 mt-12 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-4 bg-dhakaa-dark/10 rounded"></div>
          <span className="text-dhakaa-dark/30 text-xs">/</span>
          <div className="w-24 h-6 bg-dhakaa-primary/20 rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="w-full h-12 bg-dhakaa-dark/10 rounded-xl mb-4"></div>
        <div className="w-3/4 h-12 bg-dhakaa-dark/10 rounded-xl mb-8"></div>

        {/* Meta Skeleton */}
        <div className="flex items-center justify-between py-6 border-y border-black/10 mb-12">
          <div className="flex gap-6">
            <div className="w-24 h-4 bg-dhakaa-dark/10 rounded"></div>
            <div className="w-32 h-4 bg-dhakaa-dark/10 rounded"></div>
          </div>
          <div className="w-32 h-10 bg-dhakaa-dark/5 rounded-lg"></div>
        </div>

        {/* Image Skeleton */}
        <div className="w-full h-[400px] lg:h-[500px] bg-dhakaa-dark/5 rounded-3xl mb-12"></div>

        {/* Body Skeleton */}
        <div className="space-y-4">
          <div className="w-full h-4 bg-dhakaa-dark/10 rounded"></div>
          <div className="w-full h-4 bg-dhakaa-dark/10 rounded"></div>
          <div className="w-5/6 h-4 bg-dhakaa-dark/10 rounded"></div>
          <div className="w-full h-4 bg-dhakaa-dark/10 rounded mt-8"></div>
          <div className="w-4/5 h-4 bg-dhakaa-dark/10 rounded"></div>
        </div>
      </article>
    </main>
  );
}
