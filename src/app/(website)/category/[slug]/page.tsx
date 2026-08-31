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

  let displayArticles = articles;
  if (!articles || articles.length === 0) {
    if (decodedSlug === 'قسم الذكاء الاصطناعي') {
      displayArticles = [
        {
          title: "كيف نستخدم الذكاء الاصطناعي لتحسين التحصيل الدراسي؟",
          excerpt: "ورشة عمل تفاعلية لطلاب الأكاديمية تسلط الضوء على أدوات الذكاء الاصطناعي المساعدة في البحث العلمي وتلخيص المناهج الدراسية.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" } }
        },
        {
          title: "مشروع تخرج: روبوت ذكي لمساعدة ذوي الاحتياجات الخاصة",
          excerpt: "فريق من طلبة الذكاء الاصطناعي يبتكرون روبوتاً صغيراً يعتمد على رؤية الحاسوب لمساعدة المكفوفين في تجاوز العقبات.",
          category: decodedSlug,
          _createdAt: new Date(Date.now() - 86400000).toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    } else if (decodedSlug === 'قسم العلوم') {
      displayArticles = [
        {
          title: "تجارب الكيمياء الممتعة: سحر التفاعلات في مختبراتنا",
          excerpt: "طلاب قسم العلوم يبهرون الحضور في المعرض السنوي بتجارب كيميائية آمنة وملونة توضح مفاهيم التفاعل والاحتراق.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80" } }
        },
        {
          title: "رحلة علمية إلى مرصد الفلك الوطني",
          excerpt: "نظم قسم العلوم رحلة ميدانية لمراقبة النجوم والكواكب باستخدام التلسكوبات المتطورة لربط الجانب النظري بالعملي.",
          category: decodedSlug,
          _createdAt: new Date(Date.now() - 86400000).toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    } else if (decodedSlug === 'الريادة والابتكار') {
      displayArticles = [
        {
          title: "حاضنة الأعمال المدرسية تدعم 5 مشاريع طلابية ناشئة",
          excerpt: "تم اختيار خمسة مشاريع ريادية من قبل لجنة التحكيم لتقديم الدعم المالي والتوجيهي لتحويلها إلى نماذج حقيقية.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80" } }
        },
        {
          title: "طالب من الأكاديمية يفوز بجائزة أصغر رائد أعمال",
          excerpt: "تكريم الطالب أحمد لتصميمه تطبيقاً ذكياً ينظم أوقات المذاكرة ويحفز الطلاب عبر نظام مكافآت مبتكر.",
          category: decodedSlug,
          _createdAt: new Date(Date.now() - 86400000).toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    } else if (decodedSlug === 'الأنشطة المدرسية') {
      displayArticles = [
        {
          title: "اختتام فعاليات الدوري الرياضي السنوي لكرة القدم",
          excerpt: "وسط حماس جماهيري كبير من الطلاب والمعلمين، توج فريق الصف العاشر ببطولة الدوري بعد مباراة نهائية مثيرة.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1518605368461-1ee12db8bc55?auto=format&fit=crop&w=800&q=80" } }
        },
        {
          title: "معرض الفنون التشكيلية: إبداعات بأنامل طلابية",
          excerpt: "لوحات فنية ومجسمات إبداعية تعبر عن التراث والمستقبل في المعرض الفني الذي أقيم في الساحة الرئيسية.",
          category: decodedSlug,
          _createdAt: new Date(Date.now() - 86400000).toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    } else if (decodedSlug === 'إعلانات الأكاديمية') {
      displayArticles = [
        {
          title: "جدول امتحانات منتصف الفصل الدراسي الأول 2026",
          excerpt: "نلفت عناية أولياء الأمور والطلبة الكرام بأنه تم اعتماد ونشر جداول الامتحانات النصفية على بوابة الطالب الإلكترونية.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80" } }
        },
        {
          title: "دعوة لحضور اجتماع مجلس الآباء والمعلمين الأول",
          excerpt: "تدعوكم إدارة الأكاديمية لحضور الاجتماع التشاوري الأول لمناقشة خطط التطوير الأكاديمي والأنشطة اللامنهجية للعام الحالي.",
          category: decodedSlug,
          _createdAt: new Date(Date.now() - 86400000).toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    } else {
      displayArticles = [
        {
          title: `مقالات متنوعة في ${decodedSlug}`,
          excerpt: "هذا القسم مخصص لنشر أحدث المقالات والأخبار المتعلقة بهذا التخصص. سيتم إضافة محتوى جديد قريباً.",
          category: decodedSlug,
          _createdAt: new Date().toISOString(),
          mainImage: { asset: { url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" } }
        }
      ];
    }
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>

    </main>
  );
}
