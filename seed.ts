import { getCliClient } from 'sanity/cli'
import { v4 as uuidv4 } from 'uuid'

const client = getCliClient()

const articles = [
  // قسم الذكاء الاصطناعي
  {
    _type: 'article',
    title: 'أكاديمية الباب العالي تطلق مختبر الذكاء الاصطناعي الأول من نوعه للطلاب',
    slug: { _type: 'slug', current: 'ai-lab-opening' },
    category: 'قسم الذكاء الاصطناعي',
    excerpt: 'في خطوة رائدة على مستوى التعليم، افتتحت الأكاديمية مختبرها الجديد الذي سيتيح للطلبة استكشاف وتعلم تقنيات الذكاء الاصطناعي التوليدي والبرمجة المتقدمة بأسلوب تطبيقي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'افتتحت أكاديمية الباب العالي للتميز اليوم مختبر الذكاء الاصطناعي الجديد، والذي يهدف إلى دمج التقنيات الحديثة في المناهج الدراسية وتدريب الطلاب على أحدث لغات البرمجة ونماذج الذكاء الاصطناعي التوليدي.' }]
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'تطوير تطبيق مدرسي متكامل بأيدي طلاب فريق البرمجة',
    slug: { _type: 'slug', current: 'student-app-dev' },
    category: 'قسم الذكاء الاصطناعي',
    excerpt: 'نجح مجموعة من طلبة الأكاديمية الموهوبين في برمجة وتطوير تطبيق للهواتف الذكية يسهل عملية التواصل بين المعلمين وأولياء الأمور ويعتمد على خوارزميات التعلم الآلي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'التطبيق يوفر ميزات متقدمة تشمل تتبع الواجبات وجداول الامتحانات وتحليل أداء الطالب باستخدام تقنيات الذكاء الاصطناعي.' }]
      }
    ],
    isHero: false,
  },

  // قسم العلوم
  {
    _type: 'article',
    title: 'إنجازات مبهرة في أسبوع العلوم وتجارب الكيمياء الحية',
    slug: { _type: 'slug', current: 'science-week-success' },
    category: 'قسم العلوم',
    excerpt: 'شهد أسبوع العلوم في الأكاديمية تفاعلاً كبيراً من الطلاب حيث قدموا مجموعة من التجارب الكيميائية والفيزيائية المبتكرة أمام لجان التحكيم بحضور أولياء الأمور.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'المعرض العلمي السنوي يعتبر من أهم الركائز العملية في تعليم أبنائنا الطلبة، حيث شمل تجارب عن الطاقة المتجددة وعلوم الفضاء والميكانيكا.' }]
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'افتتاح مرصد فلكي مصغر لرصد النجوم والكواكب',
    slug: { _type: 'slug', current: 'astronomy-observatory' },
    category: 'قسم العلوم',
    excerpt: 'قام قسم العلوم بافتتاح قبة فلكية مصغرة مزودة بتلسكوبات حديثة لتمكين الطلبة من دراسة الفضاء الخارجي والتعرف على المجموعة الشمسية عن قرب.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يأتي هذا الإنجاز لتعزيز اهتمام الطلاب بعلوم الفضاء والفيزياء الفلكية وتوفير بيئة تطبيقية ممتعة بعيداً عن التلقين التقليدي.' }]
      }
    ],
    isHero: false,
  },

  // الريادة والابتكار
  {
    _type: 'article',
    title: 'افتتاح مبهر لبرنامج خالد لريادة الأعمال في أكاديمية الباب العالي',
    slug: { _type: 'slug', current: 'khaled-leadership-program' },
    category: 'الريادة والابتكار',
    excerpt: 'في احتفال كبير وبحضور رسمي، تم الإعلان رسمياً عن إطلاق مسار الريادة والأعمال الذي يهدف لبناء قادة المستقبل ودعم ابتكارات الطلبة في بيئة مجهزة بأحدث التقنيات.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يعد برنامج خالد لريادة الأعمال (Khaled Leadership Program) نقلة نوعية في الأكاديمية، حيث تم تجهيز قاعة خاصة تعكس طابعاً رسمياً واحترافياً لمحاكاة بيئة الشركات والمؤتمرات الدولية.' }]
      }
    ],
    isHero: true,
  },
  {
    _type: 'article',
    title: 'حاضنة ريادة الأعمال المدرسية تمول 3 مشاريع ناشئة للطلاب',
    slug: { _type: 'slug', current: 'entrepreneurship-incubator' },
    category: 'الريادة والابتكار',
    excerpt: 'إيماناً بقدرات الجيل الجديد، قدمت إدارة الأكاديمية دعماً مالياً وتوجيهياً لثلاثة مشاريع ريادية ابتكرها الطلاب لحل مشاكل بيئية باستخدام إعادة التدوير.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'المشاريع شملت أنظمة ري ذكية وتطبيقات متخصصة في الحد من الهدر الغذائي داخل المدارس والمجتمع المحلي.' }]
      }
    ],
    isHero: false,
  },

  // الأنشطة المدرسية
  {
    _type: 'article',
    title: 'اختتام فعاليات الدوري الرياضي الداخلي وتتويج الفائزين',
    slug: { _type: 'slug', current: 'sports-league-finale' },
    category: 'الأنشطة المدرسية',
    excerpt: 'وسط أجواء حماسية وروح رياضية عالية، اختتمت أكاديمية الباب العالي فعاليات الدوري المدرسي بكرة القدم وتتويج فريق المرحلة الثانوية كبطل للموسم.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'شهدت المباراة النهائية حضوراً كبيراً من الطلاب والمعلمين، وتخللها عروض رياضية مميزة قدمها فريق الكشافة.' }]
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'معرض فني لإبداعات الطلبة في يوم الاستقلال',
    slug: { _type: 'slug', current: 'art-exhibition-independence' },
    category: 'الأنشطة المدرسية',
    excerpt: 'نظم قسم الأنشطة الفنية معرضاً رسومياً تضمن لوحات وأعمالاً يدوية تعبر عن حب الوطن وتضحيات الأجداد بمناسبة يوم الاستقلال.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'وقد أشاد الحضور بالمستوى الفني الراقي للطلبة وقدرتهم على التعبير عن المشاعر الوطنية بالألوان والخطوط.' }]
      }
    ],
    isHero: false,
  },

  // إعلانات الأكاديمية
  {
    _type: 'article',
    title: 'دعوة لحضور الاجتماع الدوري لمجلس الآباء والمعلمين',
    slug: { _type: 'slug', current: 'parents-meeting-invite' },
    category: 'إعلانات الأكاديمية',
    excerpt: 'تدعو إدارة أكاديمية الباب العالي للتميز أولياء الأمور الكرام لحضور الاجتماع التشاوري الأول لمناقشة خطط التطوير الأكاديمي والأنشطة اللامنهجية للعام الحالي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'الاجتماع سيعقد يوم الخميس القادم في مسرح الأكاديمية الرئيسي تمام الساعة العاشرة صباحاً.' }]
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'فتح باب التسجيل المبكر وتوفير منح للطلبة المتفوقين',
    slug: { _type: 'slug', current: 'early-registration-scholarships' },
    category: 'إعلانات الأكاديمية',
    excerpt: 'يسرنا الإعلان عن بدء استقبال طلبات الالتحاق للعام الدراسي القادم مع توفير منح دراسية تصل إلى 50% للطلبة الحاصلين على معدلات امتياز.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يرجى مراجعة قسم التسجيل والقبول خلال ساعات الدوام الرسمي لاستكمال الطلبات والأوراق الثبوتية.' }]
      }
    ],
    isHero: false,
  }
];

async function seed() {
  console.log('Seeding articles into Sanity database...');
  for (const article of articles) {
    try {
      const res = await client.create(article);
      console.log(`Created article: ${article.title} (ID: ${res._id})`);
    } catch (err) {
      console.error(`Failed to create article: ${article.title}`, err.message);
    }
  }
  console.log('Seeding complete!');
}

seed();
