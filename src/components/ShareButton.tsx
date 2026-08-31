"use client";
import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط بنجاح!");
    }
  };

  return (
    <button onClick={handleShare} className="flex items-center gap-2 bg-dhakaa-dark/5 hover:bg-dhakaa-primary hover:text-white text-dhakaa-dark px-4 py-2 rounded-lg text-sm font-bold transition-all">
      <Share2 size={16} /> مشاركة الخبر
    </button>
  );
}
