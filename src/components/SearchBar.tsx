"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <input
        type="text"
        placeholder="ابحث عن الأخبار..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-dhakaa-dark/10 border border-dhakaa-primary/20 text-dhakaa-secondary placeholder-dhakaa-secondary/50 rounded-full py-1.5 px-4 pr-9 text-xs focus:outline-none focus:ring-1 focus:ring-dhakaa-primary transition-all w-28 focus:w-40 xl:w-40 xl:focus:w-56"
      />
      <button type="submit" className="absolute right-3 text-dhakaa-primary opacity-70 hover:opacity-100 transition-opacity">
        <Search size={16} />
      </button>
    </form>
  );
}
