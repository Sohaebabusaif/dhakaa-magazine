import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Folder } from "lucide-react";
import { client } from "../../../../sanity/client";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Fetch articles for this category
  const query = `*[_type == "article" && category == $slug] | order(_createdAt desc){
    title, excerpt, slug, category, mainImage{asset->{url}}
  }`;
  
  const articles = await client.fetch(query, { slug: decodedSlug });

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20">
      
      {/* ══ HEADER ══ */}
      <div className="bg-dhakaa-dark text-white py-12 border-b-4 border-dhakaa-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-dhakaa-primary font-bold mb-6 hover:text-white transition-colors">
            <ChevronLeft size={16} /> العودة للرئيسية
          </Link>
          <div className="flex items-center gap-4">
            <Folder className="text-dhakaa-primary" size={40} />
            <h1 className="text-4xl font-black">قسم: {decodedSlug}</h1>
          </div>
        </div>
      </div>

      {/* ══ ARTICLES GRID ══ */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-black/5">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <h2 className="text-2xl font-bold text-dhakaa-dark mb-2">لا يوجد مقالات حالياً</h2>
            <p className="text-dhakaa-dark/60">لم يتم نشر أي مقالات في قسم "{decodedSlug}" بعد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, i: number) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 group cursor-pointer hover:shadow-md transition-all">
                {article.mainImage ? (
                  <div className="w-full h-48 bg-cover bg-center" style={{backgroundImage: \`url(\${article.mainImage.asset.url})\`}}></div>
                ) : (
                  <div className="w-full h-48 bg-dhakaa-dark/5 flex items-center justify-center">
                    <span className="text-6xl opacity-10">📰</span>
                  </div>
                )}
                <div className="p-6">
                  <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-dhakaa-primary/10 text-dhakaa-primary font-bold mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-dhakaa-dark text-lg font-bold leading-snug mb-3 group-hover:text-dhakaa-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-dhakaa-dark/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="text-xs font-bold text-dhakaa-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    اقرأ المزيد <ChevronLeft size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
