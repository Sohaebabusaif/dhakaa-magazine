import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Folder } from "lucide-react";
import { client } from "../../../../sanity/client";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  
  // Fetch articles for this category
  const articles = await client.fetch(
    `*[_type == "article" && category == $slug] | order(_createdAt desc){
      title,
      excerpt,
      slug,
      category,
      mainImage{
        asset->{
          url
        }
      }
    }`,
    { slug: decodedSlug }
  );

  // Fallback specifically for Khaled Leadership requested by user
  const fallbackArticles = decodedSlug === "الريادة والابتكار" ? [
    {
      title: "افتتاح مبهر لبرنامج خالد لريادة الأعمال في أكاديمية الباب العالي",
      excerpt: "في احتفال كبير وبحضور رسمي، تم الإعلان رسمياً عن إطلاق مسار الريادة والأعمال الذي يهدف لبناء قادة المستقبل ودعم ابتكارات الطلبة في بيئة مجهزة بأحدث التقنيات.",
      category: "الريادة والابتكار",
      mainImage: { asset: { url: "/khaled-leadership.jpg" } }
    }
  ] : [];

  const displayArticles = articles && articles.length > 0 ? articles : fallbackArticles;

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20">
      
      <nav className="sticky top-0 z-50 bg-dhakaa-dark text-dhakaa-secondary shadow-xl border-b border-dhakaa-primary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <Image src="/logo.png" alt="HGA DHAKAA Logo" width={40} height={40} className="object-contain w-auto h-auto" priority />
                <div className="flex flex-col">
                  <div className="text-xl font-black tracking-widest group-hover:text-dhakaa-primary transition-colors">
                    ذكاء الباب العالي
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-12 border-b-2 border-dhakaa-dark pb-4">
          <div className="w-2 h-8 bg-dhakaa-primary"></div>
          <h1 className="text-3xl lg:text-4xl font-black text-dhakaa-dark">{decodedSlug}</h1>
        </div>

        {displayArticles.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-black/5">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <h2 className="text-2xl font-bold text-dhakaa-dark mb-2">هذا القسم فارغ حالياً</h2>
            <p className="text-dhakaa-dark/60">لم يتم نشر أي مقالات في قسم {decodedSlug} حتى الآن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayArticles.map((article: any, i: number) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 group cursor-pointer hover:shadow-md transition-all">
                {article.mainImage ? (
                  <div className="w-full h-48 bg-cover bg-center" style={{backgroundImage: `url(${article.mainImage.asset.url})`}}></div>
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
