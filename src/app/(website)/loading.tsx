import { Search, Menu } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo">
      {/* Skeleton Navbar */}
      <nav className="sticky top-0 z-50 bg-dhakaa-dark text-dhakaa-secondary shadow-xl border-b border-dhakaa-primary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Loading" width={40} height={40} className="object-contain w-auto h-auto opacity-50 animate-pulse" />
                <div className="w-32 h-6 bg-dhakaa-secondary/20 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12 animate-pulse">
        {/* Skeleton Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="w-24 h-6 bg-dhakaa-primary/20 rounded-full mb-6"></div>
            <div className="w-3/4 h-12 bg-dhakaa-dark/10 rounded-xl mb-6"></div>
            <div className="w-1/2 h-12 bg-dhakaa-dark/10 rounded-xl mb-6"></div>
            <div className="w-full h-4 bg-dhakaa-dark/5 rounded mb-3"></div>
            <div className="w-5/6 h-4 bg-dhakaa-dark/5 rounded mb-8"></div>
          </div>
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="w-full h-[400px] bg-dhakaa-dark/5 rounded-3xl"></div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col">
              <div className="h-48 bg-dhakaa-dark/5 w-full"></div>
              <div className="p-6 flex flex-col gap-3">
                <div className="w-full h-6 bg-dhakaa-dark/10 rounded"></div>
                <div className="w-3/4 h-6 bg-dhakaa-dark/10 rounded"></div>
                <div className="w-full h-4 bg-dhakaa-dark/5 rounded mt-4"></div>
                <div className="w-full h-4 bg-dhakaa-dark/5 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
