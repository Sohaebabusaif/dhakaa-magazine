import Image from "next/image";
import Link from "next/link";
import { Share2, Mail, Globe, FileText, Copy, AlertTriangle, ShieldCheck, TrendingUp, Search, Menu, ChevronLeft, Building } from "lucide-react";
import { client } from "../../sanity/client";

export default async function Home() {
  // Fetch data from Sanity
  const breakingNewsData = await client.fetch(`*[_type == "breakingNews" && isActive == true]{title}`);
  const heroArticleData = await client.fetch(`*[_type == "article" && isHero == true][0]{title, excerpt, slug, category, mainImage{asset->{url}}}`);
  const topArticlesData = await client.fetch(`*[_type == "article" && isHero != true] | order(_createdAt desc)[0...4]{title, excerpt, slug, category, mainImage{asset->{url}}}`);

  // Fallbacks if Sanity database is empty (so the design doesn't break)
  const defaultBreakingNews = [
    { title: "Microsoft: 400 مليون جهاز Windows خرجت من الخدمة خلال 3 سنوات" },
    { title: "OpenAI: الإعلان عن نموذج GPT-5 الصيف القادم بمميزات ثورية" },
    { title: "Anthropic: نموذج Claude 4 يتصدر اختبارات البرمجة عالمياً" }
  ];
  
  const breakingNews = breakingNewsData.length > 0 ? breakingNewsData : defaultBreakingNews;
  
  const heroArticle = heroArticleData || {
    title: "GPT-5: نهاية عصر النماذج المتفرقة — ذكاء اصطناعي واحد يسمع ويرى ويقرأ",
    excerpt: "أعلن سام ألتمان أن OpenAI توحّد نماذجها المتعددة في نموذج موحد ضخم يُعالج النص والصورة والصوت في آنٍ واحد. GPT-5 لن يكون مجرد تطوير — بل إعادة تعريف كاملة لما يعنيه الذكاء الاصطناعي التوليدي.",
    category: "تقنية الذكاء الاصطناعي"
  };

  const defaultTopArticles = [
    { category: "ذكاء اصطناعي", title: "Claude 4 يتصدر: Anthropic تُطلق جيلها الرابع بقدرات برمجية استثنائية", desc: "يضم نموذجَين: Opus 4 للمهام الثقيلة، وSonnet 4 للاستخدام اليومي. GitHub اختارته رسمياً لتشغيل Copilot.", icon: "🤖", color: "bg-dhakaa-accent text-dhakaa-secondary" },
    { category: "تطوير", title: "Google تُطلق Gemini CLI: ذكاء اصطناعي مباشر من سطر الأوامر", desc: "واجهة طرفية تُتيح للمطورين التفاعل مع Gemini 2.5 Pro مباشرةً دون واجهة رسومية، وبمستوى مجاني سخي.", icon: "💻", color: "bg-dhakaa-primary text-white" },
    { category: "تعليم", title: "الإمارات تُلزم بتعليم الذكاء الاصطناعي من رياض الأطفال — سابقة عالمية", desc: "وزارة التربية الإماراتية اعتمدت منهجاً شاملاً يمتد من KG حتى الصف 12 لدمج الذكاء الاصطناعي في التعليم العام.", icon: "🎓", color: "bg-dhakaa-secondary text-dhakaa-dark" },
    { category: "أبل", title: "iOS 19 وApple Intelligence: الرهان الأكبر على الذكاء الاصطناعي الخاص", desc: "Apple تكشف في WWDC 2025 عن نظام ذكاء اصطناعي يعمل محلياً على الجهاز دون الحاجة لإرسال البيانات للسحابة.", icon: "📱", color: "bg-dhakaa-dark text-white" }
  ];

  const topArticles = topArticlesData.length > 0 
    ? topArticlesData.map((a: any) => ({
        category: a.category || "أخبار",
        title: a.title,
        desc: a.excerpt,
        icon: "📰",
        color: "bg-dhakaa-primary/10 text-dhakaa-primary"
      }))
    : defaultTopArticles;

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20">
      
      {/* ══ NAVBAR (Sticky) ══ */}
      <nav className="sticky top-0 z-50 bg-dhakaa-dark text-dhakaa-secondary shadow-xl border-b border-dhakaa-primary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Right: Menu & Search (Mobile) */}
            <div className="flex lg:hidden items-center gap-4">
              <button><Menu size={20} /></button>
              <button><Search size={20} /></button>
            </div>

            {/* Center/Right: Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                <Image src="/logo.png" alt="HGA DHAKAA Logo" width={40} height={40} className="object-contain w-auto h-auto" priority />
                <div className="flex flex-col">
                  <div className="text-xl font-black tracking-widest group-hover:text-dhakaa-primary transition-colors">
                    ذكاء الباب العالي
                  </div>
                  <div className="text-[9px] tracking-[4px] text-dhakaa-primary font-bold">HGA DHAKAA</div>
                </div>
              </Link>
              
              {/* Desktop Tabs */}
              <div className="hidden lg:flex items-center gap-1 text-sm font-bold">
                <Link href="/" className="px-4 py-2 bg-dhakaa-primary text-dhakaa-bg rounded-lg">الرئيسية</Link>
                <Link href="/category/ذكاء اصطناعي" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors">ذكاء اصطناعي</Link>
                <Link href="/category/تطوير" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors">تطوير</Link>
                <Link href="/category/أبل" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors">أبل (Apple)</Link>
                <Link href="/category/أمن رقمي" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors">أمن رقمي</Link>
                <Link href="/archive" className="px-4 py-2 hover:bg-dhakaa-secondary/10 rounded-lg transition-colors text-dhakaa-primary">الأرشيف</Link>
              </div>
            </div>

            {/* Left: Meta / Search (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-[10px] opacity-70 text-left">
                <div>العدد الأول · المجلد الأول</div>
                <div className="font-bold">31 أغسطس — 6 سبتمبر 2026</div>
              </div>
              <button className="p-2 hover:bg-dhakaa-secondary/10 rounded-full transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ══ BREAKING NEWS TICKER ══ */}
      <div className="bg-dhakaa-accent border-b-2 border-dhakaa-primary relative overflow-hidden flex items-center h-10">
        <div className="bg-dhakaa-primary text-dhakaa-bg text-[11px] font-bold px-4 h-full flex items-center z-10 gap-1.5 whitespace-nowrap absolute right-0 shadow-lg">
          <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
          عاجل
        </div>
        <div className="overflow-hidden w-full ml-4 pl-4">
          <div className="animate-marquee whitespace-nowrap text-dhakaa-secondary text-xs pr-24 flex gap-12">
            {breakingNews.map((news: any, index: number) => (
              <span key={index}><strong className="text-white">جديد:</strong> {news.title}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN GRID LAYOUT ══ */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* === RIGHT COLUMN (Main Content) === */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* COVER STORY (Hero) */}
          <section className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden group">
            {heroArticle.mainImage ? (
              <div className="w-full h-64 bg-cover bg-center" style={{backgroundImage: \`url(\${heroArticle.mainImage.asset.url})\`}}></div>
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
              {!heroArticleData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-dhakaa-dark font-bold mb-4 flex items-center gap-2">
                      <div className="w-1 h-4 bg-dhakaa-primary"></div>
                      أبرز ما يُميّز التحديث القادم:
                    </h3>
                    <ul className="text-dhakaa-dark/70 text-sm leading-relaxed space-y-3">
                      <li className="flex items-start gap-2"><div className="mt-1.5 w-1.5 h-1.5 bg-dhakaa-primary rounded-full"></div>معالجة متزامنة للنص والصورة والصوت</li>
                      <li className="flex items-start gap-2"><div className="mt-1.5 w-1.5 h-1.5 bg-dhakaa-primary rounded-full"></div>واجهة موحدة تُلغي الحاجة لاختيار النموذج</li>
                    </ul>
                  </div>
                  <div className="bg-dhakaa-bg p-6 rounded-xl border border-black/5 flex flex-col justify-center">
                    <div className="text-xs font-bold text-dhakaa-primary mb-2">ملاحظة للنشر</div>
                    <div className="text-lg font-black text-dhakaa-dark">يمكنك إضافة المحتوى من لوحة التحكم</div>
                  </div>
                </div>
              ) : null}
              
              <div className="flex justify-between items-center pt-6 border-t border-black/10">
                <span className="text-xs font-bold opacity-60">القسم: {heroArticle.category}</span>
                <button className="flex items-center gap-2 bg-dhakaa-dark text-white text-sm px-6 py-3 rounded-full font-bold hover:bg-dhakaa-primary transition-colors">
                  قراءة التحليل المعمّق <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* TOP NEWS LIST */}
          <section>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-dhakaa-dark">
              <div className="w-1.5 h-6 bg-dhakaa-primary"></div>
              <h2 className="text-2xl font-black text-dhakaa-dark">أبرز أخبار الأسبوع</h2>
            </div>

            <div className="flex flex-col gap-8">
              {topArticles.map((article: any, i: number) => (
                <article key={i} className="group cursor-pointer">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className={`shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md ${article.color} group-hover:scale-105 transition-transform duration-300`}>
                      {article.icon}
                    </div>
                    <div className="flex-1 border-b border-black/10 pb-8 group-last:border-0 group-last:pb-0">
                      <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-dhakaa-dark/5 text-dhakaa-dark font-bold mb-3">{article.category}</span>
                      <h3 className="text-dhakaa-dark text-lg sm:text-xl font-bold leading-snug mb-3 group-hover:text-dhakaa-primary transition-colors">{article.title}</h3>
                      <p className="text-dhakaa-dark/70 text-sm leading-relaxed mb-4">{article.desc}</p>
                      <span className="text-xs font-bold text-dhakaa-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                        اقرأ المزيد <ChevronLeft size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

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
              {["GPT-5 يوحّد الوسائط", "Claude 4 يتصدر البرمجة", "Gemini CLI للمطورين", "Deepfake وخطر الجريمة", "ذكاء اصطناعي في التعليم", "تحذيرات الاتحاد الأوروبي"].map((item, i) => (
                <a href="#" key={i} className="text-sm py-2 border-b border-black/5 last:border-0 hover:text-dhakaa-primary transition-colors flex items-center gap-2">
                  <span className="text-dhakaa-primary/50 text-[10px]">■</span> {item}
                </a>
              ))}
            </div>
          </div>

          {/* Companies Index */}
          <div className="bg-dhakaa-accent p-6 rounded-2xl shadow-sm text-dhakaa-secondary">
            <h3 className="text-base font-black mb-6 flex items-center gap-2">
              <Building size={18} className="text-dhakaa-primary" />
              مؤشر عقول التقنية
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "OpenAI", product: "GPT-5", status: "قيد التطوير", color: "bg-dhakaa-primary" },
                { name: "Anthropic", product: "Claude 4", status: "متاح الآن", color: "bg-[#4CAF50]" },
                { name: "Google", product: "Gemini 2.5", status: "متاح الآن", color: "bg-[#4CAF50]" },
                { name: "Apple", product: "iOS 19", status: "قريباً", color: "bg-[#FFC107]" }
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
              مقارنة شاملة بين النماذج
            </button>
          </div>

          {/* Dangers Widget */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-6 rounded-2xl shadow-xl text-white border border-white/10">
            <div className="text-dhakaa-primary text-xs font-bold tracking-widest mb-3 flex items-center gap-2">
              <AlertTriangle size={16} /> تحذير الأسبوع
            </div>
            <h3 className="text-base font-black leading-snug mb-3">الاتحاد الأوروبي: المراقبة بالذكاء الاصطناعي تُهدد الحقوق الأساسية</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-6">
              وكالة الحقوق الأساسية تطالب بحظر تطبيقات المراقبة التنبؤية لتضمنها تحيزاً منهجياً.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-2xl mb-1">🎭</div>
                <div className="text-[10px] font-bold">التزييف العميق</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-2xl mb-1">💼</div>
                <div className="text-[10px] font-bold">الوظائف المهددة</div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* ══ FOOTER & ACTION BAR (Bottom) ══ */}
      <footer className="bg-dhakaa-dark pt-16 pb-8 mt-12 border-t-4 border-dhakaa-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Image src="/logo.png" alt="HGA DHAKAA Logo" width={60} height={60} className="object-contain bg-white rounded-xl p-1 w-auto h-auto" />
                <div>
                  <div className="text-2xl font-black text-dhakaa-secondary tracking-[4px]">ذكاء الباب العالي</div>
                  <div className="text-dhakaa-primary text-xs tracking-[6px]">HGA DHAKAA</div>
                </div>
              </div>
              <p className="text-sm text-dhakaa-secondary/70 leading-relaxed mb-6 max-w-sm">
                المجلة الأسبوعية الأولى للتقنية والذكاء الاصطناعي من أكاديمية الباب العالي للتميز. نضع المستقبل بين يديك.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="flex flex-col gap-3 text-sm text-dhakaa-secondary/70">
                <li><a href="#" className="hover:text-dhakaa-primary transition-colors">من نحن</a></li>
                <li><a href="#" className="hover:text-dhakaa-primary transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-dhakaa-primary transition-colors">شروط الاستخدام</a></li>
                <li><a href="#" className="hover:text-dhakaa-primary transition-colors">تواصل مع هيئة التحرير</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">شارك العدد</h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 p-3 rounded-xl transition-all">
                  <Share2 size={18} /> <span className="text-xs font-bold">واتساب</span>
                </button>
                <button className="flex items-center gap-2 bg-black/50 text-white hover:bg-black border border-white/10 p-3 rounded-xl transition-all">
                  <Globe size={18} /> <span className="text-xs font-bold">إكس (X)</span>
                </button>
                <button className="flex items-center gap-2 bg-dhakaa-primary/10 text-dhakaa-primary hover:bg-dhakaa-primary hover:text-dhakaa-bg border border-dhakaa-primary/20 p-3 rounded-xl transition-all">
                  <Mail size={18} /> <span className="text-xs font-bold">بريد إلكتروني</span>
                </button>
                <button className="flex items-center gap-2 bg-dhakaa-secondary/10 text-dhakaa-secondary hover:bg-dhakaa-secondary hover:text-dhakaa-dark border border-dhakaa-secondary/20 p-3 rounded-xl transition-all">
                  <FileText size={18} /> <span className="text-xs font-bold">تحميل PDF</span>
                </button>
              </div>
              <button className="mt-3 w-full flex items-center justify-center gap-2 bg-white/5 text-white p-3 rounded-xl hover:bg-white/10 transition-colors text-xs font-bold">
                <Copy size={16} /> <span>نسخ رابط المجلة</span>
              </button>
            </div>
          </div>

          <div className="border-t border-dhakaa-secondary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dhakaa-secondary/50">
            <div>&copy; 2026 مجلة ذكاء الباب العالي (HGA DHAKAA). جميع الحقوق محفوظة لأكاديمية الباب العالي للتميز.</div>
            <div>رئيس التحرير: <strong className="text-dhakaa-primary">صهيب الشياب</strong> | عمّان، الأردن</div>
          </div>
        </div>
      </footer>

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
