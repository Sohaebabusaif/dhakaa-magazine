import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Archive as ArchiveIcon } from "lucide-react";
import { client } from "../../../sanity/client";

export const revalidate = 0; // Disable static caching for the archive so it's always up-to-date

export default async function ArchivePage() {
  // Fetch ALL articles for the archive, ordered by date
  const query = `*[_type == "article"] | order(_createdAt desc){
    title, excerpt, slug, category, _createdAt, mainImage{asset->{url}}
  }`;
  
  const articles = await client.fetch(query);

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20">
      
      {/* ══ HEADER ══ */}
      <div className="bg-dhakaa-dark text-white py-12 border-b-4 border-dhakaa-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-dhakaa-primary font-bold mb-6 hover:text-white transition-colors">
            <ChevronLeft size={16} /> العودة للرئيسية
          </Link>
          <div className="flex items-center gap-4">
            <ArchiveIcon className="text-dhakaa-primary" size={40} />
            <h1 className="text-4xl font-black">أرشيف الأخبار القديمة</h1>
          </div>
          <p className="mt-4 text-white/60 max-w-2xl">
            تصفح جميع المقالات والأخبار السابقة المنشورة في المجلة مرتبة زمنياً من الأحدث إلى الأقدم.
          </p>
        </div>
      </div>

      {/* ══ ARTICLES LIST ══ */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-black/5">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <h2 className="text-2xl font-bold text-dhakaa-dark mb-2">الأرشيف فارغ حالياً</h2>
            <p className="text-dhakaa-dark/60">لم يتم نشر أي مقالات في المجلة بعد.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {articles.map((article: any, i: number) => {
              const date = new Date(article._createdAt).toLocaleDateString('ar-JO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });

              return (
                <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 group cursor-pointer hover:shadow-md transition-all flex flex-col sm:flex-row">
                  {article.mainImage ? (
                    <div className="w-full sm:w-64 h-48 sm:h-auto shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${article.mainImage.asset.url})`}}></div>
                  ) : (
                    <div className="w-full sm:w-64 h-48 sm:h-auto shrink-0 bg-dhakaa-dark/5 flex items-center justify-center">
                      <span className="text-4xl opacity-10">📰</span>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-dhakaa-primary/10 text-dhakaa-primary font-bold">
                        {article.category}
                      </span>
                      <span className="text-xs text-dhakaa-dark/40 font-bold">{date}</span>
                    </div>
                    <h3 className="text-dhakaa-dark text-xl font-bold leading-snug mb-3 group-hover:text-dhakaa-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-dhakaa-dark/70 text-sm leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <span className="text-xs font-bold text-dhakaa-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                      اقرأ المزيد <ChevronLeft size={14} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

    </main>
  );
}
