import { client } from "../../../../sanity/client";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Calendar, User, Share2 } from "lucide-react";
import { PortableText } from '@portabletext/react';
import ShareButton from "../../../../components/ShareButton";
import MainNavbar from "../../../../components/MainNavbar";
import { Metadata } from 'next';

export const revalidate = 0; // Force dynamic rendering

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const article = await client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{title, excerpt, mainImage{asset->{url}}}`,
    { slug: decodedSlug }
  );

  if (!article) {
    return { title: 'مقال غير موجود' };
  }

  const imageUrl = article.mainImage?.asset?.url || 'https://dhakaa-magazine.vercel.app/logo.png';

  return {
    title: `${article.title} | مجلة ذكاء الأسبوعية`,
    description: article.excerpt || 'اقرأ التفاصيل الكاملة لهذا الخبر على مجلة ذكاء الأسبوعية',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://dhakaa-magazine.vercel.app/article/${decodedSlug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const query = `*[_type == "article" && slug.current == $slug][0]{
    title,
    excerpt,
    "categoryTitle": coalesce(category->title, category),
    "categorySlug": category->slug.current,
    _createdAt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{url}
      }
    },
    mainImage{
      asset->{
        url
      }
    }
  }`;

  const article = await client.fetch(query, { slug: decodedSlug });

  if (!article) {
    return (
      <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-4 opacity-20">🔍</div>
        <h1 className="text-3xl font-black text-dhakaa-dark mb-4">لم يتم العثور على المقال</h1>
        <p className="text-dhakaa-dark/60 mb-8">عذراً، المقال الذي تبحث عنه غير موجود أو تم حذفه.</p>
        <Link href="/" className="bg-dhakaa-primary text-dhakaa-bg px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-dhakaa-dark transition-colors">
          <ChevronLeft size={20} /> العودة للرئيسية
        </Link>
      </main>
    );
  }

  // Format date
  const date = new Date(article._createdAt);
  const formattedDate = new Intl.DateTimeFormat('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  // PortableText components customization
  const ptComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?.url) return null;
        return (
          <div className="my-8 rounded-2xl overflow-hidden border border-black/10">
            <img src={value.asset.url} alt={value.alt || 'صورة توضيحية'} className="w-full h-auto object-cover" />
          </div>
        );
      },
    },
    block: {
      normal: ({ children }: any) => <p className="mb-6 text-lg leading-loose text-dhakaa-dark/80">{children}</p>,
      h1: ({ children }: any) => <h1 className="text-3xl font-black text-dhakaa-dark mt-12 mb-6">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-black text-dhakaa-dark mt-10 mb-5">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-bold text-dhakaa-dark mt-8 mb-4">{children}</h3>,
      blockquote: ({ children }: any) => <blockquote className="border-r-4 border-dhakaa-primary bg-dhakaa-primary/5 p-6 my-8 rounded-l-2xl text-dhakaa-dark/90 font-bold text-xl italic">{children}</blockquote>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-black text-dhakaa-dark bg-dhakaa-secondary/20 px-1 rounded">{children}</strong>,
      em: ({ children }: any) => <em className="italic text-dhakaa-dark/70">{children}</em>,
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        return (
          <a href={value.href} rel={rel} className="text-dhakaa-primary underline underline-offset-4 decoration-2 decoration-dhakaa-primary/30 hover:decoration-dhakaa-primary transition-all">
            {children}
          </a>
        );
      },
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-none space-y-3 my-6 text-lg leading-loose text-dhakaa-dark/80 pr-4 border-r-2 border-dhakaa-secondary/30">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside space-y-3 my-6 text-lg leading-loose text-dhakaa-dark/80">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="flex items-start gap-2 before:content-['■'] before:text-[10px] before:text-dhakaa-primary before:mt-2.5">{children}</li>,
    },
  };

  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo text-dhakaa-text selection:bg-dhakaa-primary/20 pb-20">
      
      <MainNavbar backLink={{ href: `/category/${article.categorySlug || '#'}`, label: `العودة لقسم: ${article.categoryTitle || 'عام'}` }} />

      <article className="max-w-4xl mx-auto px-4 lg:px-8 mt-12">
        {/* Breadcrumb & Category */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-dhakaa-dark/50 hover:text-dhakaa-primary text-sm font-bold transition-colors">الرئيسية</Link>
          <span className="text-dhakaa-dark/30 text-xs">/</span>
          <Link href={`/category/${article.categorySlug || '#'}`} className="bg-dhakaa-primary/10 text-dhakaa-primary px-3 py-1 rounded-full text-xs font-black hover:bg-dhakaa-primary hover:text-white transition-colors">
            {article.categoryTitle || 'عام'}
          </Link>
        </div>

        {/* Title & Meta */}
        <h1 className="text-4xl lg:text-5xl font-black text-dhakaa-dark leading-tight mb-8">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl lg:text-2xl text-dhakaa-dark/70 leading-relaxed mb-8 border-r-4 border-dhakaa-secondary pr-6">
            {article.excerpt}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-black/10 mb-12">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-dhakaa-dark/60 text-sm font-bold">
              <User size={16} className="text-dhakaa-primary" /> فريق التحرير
            </div>
            <div className="flex items-center gap-2 text-dhakaa-dark/60 text-sm font-bold">
              <Calendar size={16} className="text-dhakaa-primary" /> {formattedDate}
            </div>
          </div>
          <ShareButton title={article.title} />
        </div>

        {/* Hero Image */}
        {article.mainImage && (
          <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-black/5 mb-12">
            <img 
              src={article.mainImage.asset.url} 
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        )}

        {/* Article Body using Portable Text */}
        <div className="font-cairo text-dhakaa-dark text-lg leading-loose">
          {article.body ? (
            <PortableText value={article.body} components={ptComponents} />
          ) : (
            <div className="bg-dhakaa-primary/5 p-8 rounded-2xl text-center border border-dhakaa-primary/20 text-dhakaa-primary font-bold">
              محتوى المقال قيد التحديث...
            </div>
          )}
        </div>

        <div className="mt-20 pt-10 border-t-2 border-dhakaa-dark/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-right">
            <div className="text-xs font-bold text-dhakaa-primary uppercase tracking-widest mb-2">النهاية</div>
            <div className="text-2xl font-black text-dhakaa-dark">شكراً لقراءتك هذا التقرير</div>
          </div>
          <Link href={`/category/${article.categorySlug || '#'}`} className="bg-dhakaa-dark text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-dhakaa-primary transition-colors w-full sm:w-auto justify-center">
            تصفح المزيد من {article.categoryTitle || 'عام'} <ChevronLeft size={20} />
          </Link>
        </div>
      </article>

    </main>
  );
}
