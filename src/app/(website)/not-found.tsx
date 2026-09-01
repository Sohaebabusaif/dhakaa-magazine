import Link from "next/link";
import { ChevronRight, FileQuestion } from "lucide-react";
import MainNavbar from "../../../components/MainNavbar";
import Footer from "../../../components/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dhakaa-bg font-cairo flex flex-col">
      <MainNavbar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-dhakaa-dark text-dhakaa-primary p-6 rounded-3xl mb-6 shadow-2xl">
          <FileQuestion size={80} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-6xl font-black text-dhakaa-dark mb-4">404</h1>
        <h2 className="text-2xl font-bold text-dhakaa-dark/80 mb-6">عذراً، الصفحة غير موجودة!</h2>
        <p className="text-dhakaa-dark/60 max-w-md mx-auto mb-10 leading-relaxed text-sm">
          يبدو أن المقال أو الصفحة التي تبحث عنها قد تم نقلها، أو أن الرابط غير صحيح. لا تقلق، يمكنك العودة واكتشاف أحدث الأخبار التقنية.
        </p>
        
        <Link 
          href="/" 
          className="bg-dhakaa-primary text-dhakaa-bg px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-dhakaa-dark hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <ChevronRight size={20} /> العودة للصفحة الرئيسية
        </Link>
      </div>

      <Footer />
    </main>
  );
}
