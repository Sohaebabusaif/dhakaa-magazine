"use client";
import { Share2, Globe, Mail, FileText, Copy, Check } from "lucide-react";
import { useState } from "react";

interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  editorName?: string;
  location?: string;
  copyrightText?: string;
  footerLinks?: { label: string; url: string }[];
  socialLinks?: {
    whatsapp?: string;
    twitter?: string;
    email?: string;
    instagram?: string;
  };
  showShareButtons?: boolean;
  showQuickLinks?: boolean;
}

export default function FooterActions({ settings }: { settings: SiteSettings | null }) {
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://dhakaa-magazine.vercel.app";
  const shareText = `📰 ${settings?.siteName || 'مجلة ذكاء الأسبوعية'} - ${siteUrl}`;

  const handleWhatsApp = () => {
    const whatsappUrl = settings?.socialLinks?.whatsapp || 
      `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl.includes('wa.me') ? whatsappUrl : `https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleTwitter = () => {
    const twitterUrl = settings?.socialLinks?.twitter ||
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl.includes('twitter.com') || twitterUrl.includes('x.com') ? twitterUrl : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleEmail = () => {
    const email = settings?.socialLinks?.email || '';
    const subject = encodeURIComponent(settings?.siteName || 'مجلة ذكاء الأسبوعية');
    const body = encodeURIComponent(`تفضل بزيارة ${siteUrl}`);
    window.location.href = email ? `mailto:${email}?subject=${subject}&body=${body}` : `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = siteUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePDF = () => {
    window.print();
  };

  if (settings?.showShareButtons === false) return null;

  return (
    <div>
      <h4 className="text-white font-bold mb-6">شارك العدد</h4>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={handleWhatsApp} className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 p-3 rounded-xl transition-all cursor-pointer">
          <Share2 size={18} /> <span className="text-xs font-bold">واتساب</span>
        </button>
        <button onClick={handleTwitter} className="flex items-center gap-2 bg-black/50 text-white hover:bg-black border border-white/10 p-3 rounded-xl transition-all cursor-pointer">
          <Globe size={18} /> <span className="text-xs font-bold">إكس (X)</span>
        </button>
        <button onClick={handleEmail} className="flex items-center gap-2 bg-dhakaa-primary/10 text-dhakaa-primary hover:bg-dhakaa-primary hover:text-dhakaa-bg border border-dhakaa-primary/20 p-3 rounded-xl transition-all cursor-pointer">
          <Mail size={18} /> <span className="text-xs font-bold">بريد إلكتروني</span>
        </button>
        <button onClick={handlePDF} className="flex items-center gap-2 bg-dhakaa-secondary/10 text-dhakaa-secondary hover:bg-dhakaa-secondary hover:text-dhakaa-dark border border-dhakaa-secondary/20 p-3 rounded-xl transition-all cursor-pointer">
          <FileText size={18} /> <span className="text-xs font-bold">طباعة / PDF</span>
        </button>
      </div>
      <button onClick={handleCopy} className={`mt-3 w-full flex items-center justify-center gap-2 p-3 rounded-xl transition-all text-xs font-bold cursor-pointer ${copied ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/5 text-white hover:bg-white/10'}`}>
        {copied ? <><Check size={16} /> <span>تم النسخ بنجاح!</span></> : <><Copy size={16} /> <span>نسخ رابط المجلة</span></>}
      </button>
    </div>
  );
}
