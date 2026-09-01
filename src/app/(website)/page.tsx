import Image from "next/image";
import Link from "next/link";
import { FileText, AlertTriangle, ChevronLeft, Building } from "lucide-react";
import { client } from "../../sanity/client";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";

export const revalidate = 0; // Force dynamic rendering so Sanity updates show immediately

export default async function Home() {
  // Fetch data from Sanity
  const breakingNewsData = await client.fetch(`*[_type == "breakingNews" && isActive == true]{title}`);
  const heroArticle = await client.fetch(`*[_type == "article" && isHero == true][0]{title, excerpt, slug, "category": coalesce(category->title, category), mainImage{asset->{url}}}`);
  const topArticles = await client.fetch(`*[_type == "article" && isHero != true] | order(_createdAt desc)[0...4]{title, excerpt, slug, "category": coalesce(category->title, category), mainImage{asset->{url}}}`);
  const tocArticles = await client.fetch(`*[_type == "article"] | order(_createdAt desc)[0...6]{title, slug}`);
  const studentAlert = await client.fetch(`*[_type == "studentAlert"][0]`);

  const hasBreakingNews = breakingNewsData && breakingNewsData.length > 0;
  const hasHeroArticle = !!heroArticle;
  const hasTopArticles = topArticles && topArticles.length > 0;
  const isCompletelyEmpty = !hasHeroArticle && !hasTopArticles;

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20">
      
      <MainNavbar />

      {/* ══ BREAKING NEWS TICKER ══ */}
      {hasBreakingNews && (
        <div className="bg-dhakaa-accent border-b-2 border-dhakaa-primary relative overflow-hidden flex items-center h-10">
          <div className="bg-dhakaa-primary text-dhakaa-bg text-[11px] font-bold px-4 h-full flex items-center z-10 gap-1.5 whitespace-nowrap absolute right-0 shadow-lg">
            <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
            عاجل
          </div>
          <div className="overflow-hidden w-full ml-4 pl-4">
            <div className="animate-marquee whitespace-nowrap text-dhakaa-secondary text-xs pr-24 flex gap-12">
              {breakingNewsData.map((news: any, index: number) => (
                <span key={index}><strong className="text-white">جديد:</strong> {news.title}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ MAIN GRID LAYOUT ══ */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* === RIGHT COLUMN (Main Content) === */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {isCompletelyEmpty ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-black/5">
              <div className="text-6xl mb-4 opacity-20">📭</div>
              <h2 className="text-2xl font-bold text-dhakaa-dark mb-2">المجلة فارغة حالياً</h2>
              <p className="text-dhakaa-dark/60">لم يتم نشر أي أخبار حتى الآن. يمكنك إضافة المحتوى من لوحة التحكم.</p>
            </div>
          ) : (
            <>
              {/* COVER STORY (Hero) */}
              {hasHeroArticle && (
                <Link href={`/article/${heroArticle.slug?.current}`} className="block">
                  <section className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
                    {heroArticle.mainImage ? (
                      <div className="w-full h-64 bg-cover bg-center" style={{backgroundImage: `url(${heroArticle.mainImage.asset.url})`}}></div>
                    ) : null}
                    <div className="bg-dhakaa-primary p-8 lg:p-12 relative overflow-hidden">
                      <div className="absolute -left-10 -top-10 text-[200px] opacity-5 select-none font-serif">"</div>
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 bg-dhakaa-secondary rounded-full"></div>
                        <span className="text-dhakaa-secondary text-xs font-bold tracking-widest uppercase">الخبر الرئيسي</span>
                      </div>
                      <h1 className="text-dhakaa-bg text-3xl lg:text-5xl font-black mb-6 leading-tight group-hover:text-white transition-colors">
                        {heroArticle.title}
                      </h1>
                      <p className="text-dhakaa-secondary text-base lg:text-lg leading-relaxed max-w-3xl mb-8">
                        {heroArticle.excerpt}
                      </p>
                    </div>
                    
                    <div className="p-8 lg:p-12 bg-white">
                      <div className="flex justify-between items-center pt-6 border-t border-black/10">
                        <span className="text-xs font-bold opacity-60">القسم: {heroArticle.category || 'عام'}</span>
                        <div className="flex items-center gap-2 bg-dhakaa-dark text-white text-sm px-6 py-3 rounded-full font-bold group-hover:bg-dhakaa-primary transition-colors">
                          قراءة التحليل المعمّق <ChevronLeft size={16} />
                        </div>
                      </div>
                    </div>
                  </section>
                </Link>
              )}

              {/* TOP NEWS LIST */}
              {hasTopArticles && (
                <section>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-dhakaa-dark">
                    <div className="w-1.5 h-6 bg-dhakaa-primary"></div>
                    <h2 className="text-2xl font-black text-dhakaa-dark">أبرز أخبار الأسبوع</h2>
                  </div>

                  <div className="flex flex-col gap-8">
                    {topArticles.map((article: any, i: number) => (
                      <Link href={`/article/${article.slug?.current}`} key={i} className="block group">
                        <article className="cursor-pointer">
                          <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md bg-dhakaa-primary/10 text-dhakaa-primary group-hover:scale-105 transition-transform duration-300">
                              📰
                            </div>
                            <div className="flex-1 border-b border-black/10 pb-8 group-last:border-0 group-last:pb-0">
                              <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-dhakaa-dark/5 text-dhakaa-dark font-bold mb-3">{article.category || 'عام'}</span>
                              <h3 className="text-dhakaa-dark text-lg sm:text-xl font-bold leading-snug mb-3 group-hover:text-dhakaa-primary transition-colors">{article.title}</h3>
                              <p className="text-dhakaa-dark/70 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                              <span className="text-xs font-bold text-dhakaa-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                اقرأ المزيد <ChevronLeft size={14} />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

        </div>

        {/* === LEFT COLUMN (Sidebar) === */}
        <aside className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-24 h-fit">
          
          {/* TOC Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
            <h3 className="text-base font-black text-dhakaa-dark mb-4 flex items-center gap-2">
              <FileText size={18} className="text-dhakaa-primary" />
              محتويات العدد الأسبوعي
            </h3>
            <div className="flex flex-col gap-2">
              {tocArticles && tocArticles.map((article: any, i: number) => (
                <Link href={`/article/${article.slug?.current}`} key={i} className="text-sm py-2 border-b border-black/5 last:border-0 hover:text-dhakaa-primary transition-colors flex items-center gap-2">
                  <span className="text-dhakaa-primary/50 text-[10px]">■</span> {article.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Clubs Index */}
          <div className="bg-dhakaa-accent p-6 rounded-2xl shadow-sm text-dhakaa-secondary">
            <h3 className="text-base font-black mb-6 flex items-center gap-2">
              <Building size={18} className="text-dhakaa-primary" />
              مؤشر تفاعل الأندية
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "نادي العلوم", product: "مشروع الفضاء", status: "نشط", color: "bg-dhakaa-primary" },
                { name: "نادي الروبوتكس", product: "بطولة VEX", status: "تجهيز", color: "bg-[#FFC107]" },
                { name: "نادي المناظرات", product: "مسابقة وطنية", status: "مكتمل", color: "bg-[#4CAF50]" },
                { name: "فريق البرمجة", product: "تطبيق المدرسة", status: "نشط", color: "bg-dhakaa-primary" }
              ].map((co, i) => (
                <div key={i} className="bg-dhakaa-secondary/10 p-4 rounded-xl border border-dhakaa-secondary/20 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] font-bold opacity-70 mb-1">{co.name}</div>
                    <div className="text-lg font-black text-white">{co.product}</div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded">
                    <div className={`w-1.5 h-1.5 rounded-full ${co.color}`}></div>
                    <span className="text-[10px]">{co.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-dhakaa-secondary/30 rounded-xl text-xs font-bold hover:bg-dhakaa-secondary hover:text-dhakaa-dark transition-colors">
              عرض كافة تفاصيل الأندية
            </button>
          </div>

          {/* Dangers Widget - Dynamic */}
          {(!studentAlert || studentAlert.isActive !== false) && (
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl shadow-xl text-white border border-white/10">
              <div className="text-dhakaa-primary text-xs font-bold tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle size={16} /> {studentAlert?.badgeText || 'تنبيه هام للطلبة'}
              </div>
              <h3 className="text-base font-black leading-snug mb-3">
                {studentAlert?.title || 'مواعيد الامتحانات النصفية تقترب'}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed mb-6">
                {studentAlert?.description || 'نذكر أبنائنا الطلبة بضرورة الاستعداد الجيد للامتحانات القادمة والالتزام بجداول المراجعة المعتمدة.'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {studentAlert?.buttons && studentAlert.buttons.length > 0 ? (
                  studentAlert.buttons.map((btn: any, i: number) => (
                    <a key={i} href={btn.url || '#'} className="bg-white/5 p-3 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors cursor-pointer block">
                      <div className="text-2xl mb-1">{btn.icon || '🔗'}</div>
                      <div className="text-[10px] font-bold">{btn.label}</div>
                    </a>
                  ))
                ) : (
                  <>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="text-2xl mb-1">📅</div>
                      <div className="text-[10px] font-bold">جدول الامتحانات</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors cursor-pointer">
                      <div className="text-2xl mb-1">📚</div>
                      <div className="text-[10px] font-bold">دليل المراجعة</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </aside>
      </div>

      {/* ══ FOOTER & ACTION BAR (Bottom) ══ */}
      <Footer />

      {/* Marquee Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
      `}} />
    </main>
  );
}
