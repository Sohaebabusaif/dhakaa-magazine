import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مجلة ذكاء الأسبوعية | أكاديمية الباب العالي للتميز",
  description: "المجلة الأسبوعية الأولى للتقنية والذكاء الاصطناعي والإنجازات العلمية في أكاديمية الباب العالي للتميز.",
  openGraph: {
    title: "مجلة ذكاء الأسبوعية",
    description: "تغطية شاملة لأهم الأخبار التقنية والعلمية وأنشطة الطلاب في أكاديمية الباب العالي.",
    url: "https://dhakaa-magazine.vercel.app/",
    siteName: "مجلة ذكاء الأسبوعية",
    images: [
      {
        url: "https://dhakaa-magazine.vercel.app/logo.png",
        width: 800,
        height: 600,
        alt: "شعار مجلة ذكاء الأسبوعية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مجلة ذكاء الأسبوعية",
    description: "المجلة الأسبوعية الأولى للتقنية والذكاء الاصطناعي",
    images: ["https://dhakaa-magazine.vercel.app/logo.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo bg-dhakaa-bg text-dhakaa-text antialiased">
        {children}
      </body>
    </html>
  );
}
