import { client } from "../../../sanity/client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
import SearchBar from "../../../components/SearchBar";

export const revalidate = 0;

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  let articles: any[] = [];
  
  if (query) {
    const sanityQuery = `*[_type == "article" && (title match $keyword || excerpt match $keyword || category match $keyword)] | order(_createdAt desc){
      title,
      excerpt,
      slug,
      category,
      _createdAt,
      mainImage{asset->{url}}
    }`;
    articles = await client.fetch(sanityQuery, { keyword: `*${query}*` });
  }

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text pb-20">
      <nav className="bg-dhakaa-dark text-dhakaa-secondary border-b-2 border-dhakaa-primary relative z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <Image src="/logo.png" alt="HGA DHAKAA Logo" width={40} height={40} className="object-contain w-auto h-auto" priority />
              <div className="flex flex-col">
                <div className="text-xl font-black tracking-widest group-hover:text-dhakaa-primary transition-colors">
                  ذكاء الباب العالي
                </div>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-4">
               <SearchBar />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
        <h1 className="text-3xl font-black text-dhakaa-dark mb-2 flex items-center gap-3">
          <Search size={28} className="text-dhakaa-primary" /> 
          نتائج البحث عن: <span className="text-dhakaa-primary">"{query}"</span>
        </h1>
        <p className="text-dhakaa-dark/60 mb-12">تم العثور على {articles.length} نتيجة</p>

        {articles.length === 0 ? (
          <div className="bg-dhakaa-primary/5 p-12 rounded-3xl text-center border border-dhakaa-primary/20">
            <h2 className="text-2xl font-bold text-dhakaa-dark mb-4">لا توجد نتائج مطابقة لبحثك</h2>
            <p className="text-dhakaa-dark/70 mb-8">حاول استخدام كلمات مختلفة أو أكثر شمولاً.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-dhakaa-primary text-dhakaa-bg px-6 py-3 rounded-xl font-bold hover:bg-dhakaa-dark transition-colors">
              <ChevronLeft size={20} /> العودة للصفحة الرئيسية
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article: any, index: number) => (
              <Link href={`/article/${article.slug?.current}`} key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-black/5 group flex flex-col h-full">
                <div className="h-48 relative overflow-hidden bg-dhakaa-dark/5">
                  {article.mainImage ? (
                    <img src={article.mainImage.asset.url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                      <Image src="/logo.png" alt="Logo" width={50} height={50} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-dhakaa-primary text-dhakaa-bg px-3 py-1 rounded-full text-xs font-black shadow-lg">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-black text-dhakaa-dark text-xl mb-3 line-clamp-2 leading-tight group-hover:text-dhakaa-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-dhakaa-dark/70 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-dhakaa-primary text-sm font-bold mt-auto group-hover:-translate-x-2 transition-transform">
                    اقرأ المزيد <ChevronLeft size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
