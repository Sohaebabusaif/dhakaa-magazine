import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SearchBar from "../../../../components/SearchBar";
import { client } from "../../../../sanity/client";

export const revalidate = 0; // Force dynamic rendering

export default async function CategoryPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const resolvedSearchParams = await searchParams;
  
  const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
  const limit = 6;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  // Fetch articles for this category
  const articles = await client.fetch(
    `*[_type == "article" && category == $slug] | order(_createdAt desc)[$start...$end]{
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
    { slug: decodedSlug, start, end }
  );

  const totalArticles = await client.fetch(`count(*[_type == "article" && category == $slug])`, { slug: decodedSlug });
  const hasNextPage = end < totalArticles;
  const hasPrevPage = page > 1;

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
              <SearchBar />
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

        {articles.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-black/5">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <h2 className="text-2xl font-bold text-dhakaa-dark mb-2">هذا القسم فارغ حالياً</h2>
            <p className="text-dhakaa-dark/60">لم يتم نشر أي مقالات في قسم {decodedSlug} حتى الآن.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article: any, i: number) => (
              <Link href={`/article/${article.slug?.current}`} key={i} className="block group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 cursor-pointer hover:shadow-md transition-all h-full flex flex-col">
                  {article.mainImage ? (
                    <div className="w-full h-48 bg-cover bg-center" style={{backgroundImage: `url(${article.mainImage.asset.url})`}}></div>
                  ) : (
                    <div className="w-full h-48 bg-dhakaa-dark/5 flex items-center justify-center">
                      <span className="text-6xl opacity-10">📰</span>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-dhakaa-dark text-lg font-bold leading-snug mb-3 group-hover:text-dhakaa-primary transition-colors">{article.title}</h3>
                    <p className="text-dhakaa-dark/70 text-sm leading-relaxed mb-6 flex-1">{article.excerpt}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-black/10 mt-auto">
                      <span className="text-xs font-bold text-dhakaa-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        اقرأ المزيد <ChevronLeft size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {(hasPrevPage || hasNextPage) && (
          <div className="flex items-center justify-center gap-4 mt-12">
            {hasPrevPage && (
              <Link href={`/category/${decodedSlug}?page=${page - 1}`} className="px-6 py-2 bg-white text-dhakaa-primary border-2 border-dhakaa-primary rounded-xl font-bold hover:bg-dhakaa-primary hover:text-white transition-colors">
                الصفحة السابقة
              </Link>
            )}
            <div className="text-dhakaa-dark/60 font-bold">
              صفحة {page}
            </div>
            {hasNextPage && (
              <Link href={`/category/${decodedSlug}?page=${page + 1}`} className="px-6 py-2 bg-dhakaa-primary text-dhakaa-bg rounded-xl font-bold hover:bg-dhakaa-dark transition-colors">
                تحميل المزيد
              </Link>
            )}
          </div>
        )}
      </div>

    </main>
  );
}
