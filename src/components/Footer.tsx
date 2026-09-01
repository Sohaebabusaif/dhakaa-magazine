import Image from "next/image";
import Link from "next/link";
import { client } from "../sanity/client";
import FooterActions from "./FooterActions";

export default async function Footer() {
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
    siteName, siteDescription, editorName, location, copyrightText,
    footerLinks[]{label, url},
    socialLinks{whatsapp, twitter, email, instagram},
    showShareButtons, showQuickLinks
  }`);

  return (
    <footer className="bg-dhakaa-dark pt-16 pb-8 mt-12 border-t-4 border-dhakaa-primary font-cairo">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Image src="/logo.png" alt="HGA DHAKAA Logo" width={60} height={60} className="object-contain bg-white rounded-xl p-1 w-auto h-auto" />
              <div>
                <div className="text-2xl font-black text-dhakaa-secondary tracking-[4px]">{siteSettings?.siteName || 'ذكاء الباب العالي'}</div>
                <div className="text-dhakaa-primary text-xs tracking-[6px]">HGA DHAKAA</div>
              </div>
            </div>
            <p className="text-sm text-dhakaa-secondary/70 leading-relaxed mb-6 max-w-sm">
              {siteSettings?.siteDescription || 'المجلة الأسبوعية الأولى للتقنية والذكاء الاصطناعي من أكاديمية الباب العالي للتميز. نضع المستقبل بين يديك.'}
            </p>
          </div>
          
          {/* روابط سريعة - ديناميكية من لوحة التحكم */}
          {siteSettings?.showQuickLinks !== false && (
            <div>
              <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
              <ul className="flex flex-col gap-3 text-sm text-dhakaa-secondary/70">
                {siteSettings?.footerLinks && siteSettings.footerLinks.length > 0 ? (
                  siteSettings.footerLinks.map((link: any, i: number) => (
                    <li key={i}><a href={link.url || '#'} className="hover:text-dhakaa-primary transition-colors">{link.label}</a></li>
                  ))
                ) : (
                  <>
                    <li><Link href="/" className="hover:text-dhakaa-primary transition-colors">الصفحة الرئيسية</Link></li>
                    <li><Link href="/archive" className="hover:text-dhakaa-primary transition-colors">الأرشيف</Link></li>
                    <li><Link href="/search" className="hover:text-dhakaa-primary transition-colors">البحث</Link></li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* أزرار المشاركة - تعمل فعلياً */}
          <FooterActions settings={siteSettings} />
        </div>

        <div className="border-t border-dhakaa-secondary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dhakaa-secondary/50">
          <div>&copy; {new Date().getFullYear()} {siteSettings?.copyrightText || 'مجلة ذكاء الباب العالي (HGA DHAKAA). جميع الحقوق محفوظة لأكاديمية الباب العالي للتميز.'}</div>
          <div>رئيس التحرير: <strong className="text-dhakaa-primary">{siteSettings?.editorName || 'صهيب الشياب'}</strong> | {siteSettings?.location || 'عمّان، الأردن'}</div>
        </div>
      </div>
    </footer>
  );
}
