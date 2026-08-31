const PROJECT_ID = 'cby043pw';
const DATASET = 'production';
const TOKEN = 'skjwzJYLXxRR6b1zwlfVAQk3DgzNKUcGEV6e7jWfWgCISKiIs9NHBQY9eEQ1OiNPUyU1X7rpZt6rU7xUBsjmP8pWj6093rKjgHK1nGxKduEjZ46SkWIBFzFaOaBS2LjLQnDUE7grUamasFm5Z9la2zg6wwnsK2ZYGxluqt8UvSNz1cPkGNTR';
const API_VERSION = 'v2024-01-01';

const URL = `https://${PROJECT_ID}.api.sanity.io/${API_VERSION}/data/mutate/${DATASET}`;

const articles = [
  // قسم الذكاء الاصطناعي
  {
    _type: 'article',
    title: 'أكاديمية الباب العالي تطلق مختبر الذكاء الاصطناعي الأول من نوعه للطلاب',
    slug: { _type: 'slug', current: 'ai-lab-opening-new' },
    category: 'قسم الذكاء الاصطناعي',
    excerpt: 'في خطوة رائدة على مستوى التعليم، افتتحت الأكاديمية مختبرها الجديد الذي سيتيح للطلبة استكشاف وتعلم تقنيات الذكاء الاصطناعي التوليدي والبرمجة المتقدمة بأسلوب تطبيقي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'افتتحت أكاديمية الباب العالي للتميز اليوم مختبر الذكاء الاصطناعي الجديد، والذي يهدف إلى دمج التقنيات الحديثة في المناهج الدراسية وتدريب الطلاب على أحدث لغات البرمجة ونماذج الذكاء الاصطناعي التوليدي.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'تطوير تطبيق مدرسي متكامل بأيدي طلاب فريق البرمجة',
    slug: { _type: 'slug', current: 'student-app-dev-new' },
    category: 'قسم الذكاء الاصطناعي',
    excerpt: 'نجح مجموعة من طلبة الأكاديمية الموهوبين في برمجة وتطوير تطبيق للهواتف الذكية يسهل عملية التواصل بين المعلمين وأولياء الأمور ويعتمد على خوارزميات التعلم الآلي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'التطبيق يوفر ميزات متقدمة تشمل تتبع الواجبات وجداول الامتحانات وتحليل أداء الطالب باستخدام تقنيات الذكاء الاصطناعي.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },

  // قسم العلوم
  {
    _type: 'article',
    title: 'إنجازات مبهرة في أسبوع العلوم وتجارب الكيمياء الحية',
    slug: { _type: 'slug', current: 'science-week-success-new' },
    category: 'قسم العلوم',
    excerpt: 'شهد أسبوع العلوم في الأكاديمية تفاعلاً كبيراً من الطلاب حيث قدموا مجموعة من التجارب الكيميائية والفيزيائية المبتكرة أمام لجان التحكيم بحضور أولياء الأمور.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'المعرض العلمي السنوي يعتبر من أهم الركائز العملية في تعليم أبنائنا الطلبة، حيث شمل تجارب عن الطاقة المتجددة وعلوم الفضاء والميكانيكا.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'افتتاح مرصد فلكي مصغر لرصد النجوم والكواكب',
    slug: { _type: 'slug', current: 'astronomy-observatory-new' },
    category: 'قسم العلوم',
    excerpt: 'قام قسم العلوم بافتتاح قبة فلكية مصغرة مزودة بتلسكوبات حديثة لتمكين الطلبة من دراسة الفضاء الخارجي والتعرف على المجموعة الشمسية عن قرب.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يأتي هذا الإنجاز لتعزيز اهتمام الطلاب بعلوم الفضاء والفيزياء الفلكية وتوفير بيئة تطبيقية ممتعة بعيداً عن التلقين التقليدي.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },

  // الريادة والابتكار
  {
    _type: 'article',
    title: 'افتتاح مبهر لبرنامج خالد لريادة الأعمال في أكاديمية الباب العالي',
    slug: { _type: 'slug', current: 'khaled-leadership-program-new' },
    category: 'الريادة والابتكار',
    excerpt: 'في احتفال كبير وبحضور رسمي، تم الإعلان رسمياً عن إطلاق مسار الريادة والأعمال الذي يهدف لبناء قادة المستقبل ودعم ابتكارات الطلبة في بيئة مجهزة بأحدث التقنيات.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يعد برنامج خالد لريادة الأعمال (Khaled Leadership Program) نقلة نوعية في الأكاديمية، حيث تم تجهيز قاعة خاصة تعكس طابعاً رسمياً واحترافياً لمحاكاة بيئة الشركات والمؤتمرات الدولية.' }],
        markDefs: []
      }
    ],
    isHero: true,
  },
  {
    _type: 'article',
    title: 'حاضنة ريادة الأعمال المدرسية تمول 3 مشاريع ناشئة للطلاب',
    slug: { _type: 'slug', current: 'entrepreneurship-incubator-new' },
    category: 'الريادة والابتكار',
    excerpt: 'إيماناً بقدرات الجيل الجديد، قدمت إدارة الأكاديمية دعماً مالياً وتوجيهياً لثلاثة مشاريع ريادية ابتكرها الطلاب لحل مشاكل بيئية باستخدام إعادة التدوير.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'المشاريع شملت أنظمة ري ذكية وتطبيقات متخصصة في الحد من الهدر الغذائي داخل المدارس والمجتمع المحلي.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },

  // الأنشطة المدرسية
  {
    _type: 'article',
    title: 'اختتام فعاليات الدوري الرياضي الداخلي وتتويج الفائزين',
    slug: { _type: 'slug', current: 'sports-league-finale-new' },
    category: 'الأنشطة المدرسية',
    excerpt: 'وسط أجواء حماسية وروح رياضية عالية، اختتمت أكاديمية الباب العالي فعاليات الدوري المدرسي بكرة القدم وتتويج فريق المرحلة الثانوية كبطل للموسم.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'شهدت المباراة النهائية حضوراً كبيراً من الطلاب والمعلمين، وتخللها عروض رياضية مميزة قدمها فريق الكشافة.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'معرض فني لإبداعات الطلبة في يوم الاستقلال',
    slug: { _type: 'slug', current: 'art-exhibition-independence-new' },
    category: 'الأنشطة المدرسية',
    excerpt: 'نظم قسم الأنشطة الفنية معرضاً رسومياً تضمن لوحات وأعمالاً يدوية تعبر عن حب الوطن وتضحيات الأجداد بمناسبة يوم الاستقلال.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'وقد أشاد الحضور بالمستوى الفني الراقي للطلبة وقدرتهم على التعبير عن المشاعر الوطنية بالألوان والخطوط.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },

  // إعلانات الأكاديمية
  {
    _type: 'article',
    title: 'دعوة لحضور الاجتماع الدوري لمجلس الآباء والمعلمين',
    slug: { _type: 'slug', current: 'parents-meeting-invite-new' },
    category: 'إعلانات الأكاديمية',
    excerpt: 'تدعو إدارة أكاديمية الباب العالي للتميز أولياء الأمور الكرام لحضور الاجتماع التشاوري الأول لمناقشة خطط التطوير الأكاديمي والأنشطة اللامنهجية للعام الحالي.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'الاجتماع سيعقد يوم الخميس القادم في مسرح الأكاديمية الرئيسي تمام الساعة العاشرة صباحاً.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },
  {
    _type: 'article',
    title: 'فتح باب التسجيل المبكر وتوفير منح للطلبة المتفوقين',
    slug: { _type: 'slug', current: 'early-registration-scholarships-new' },
    category: 'إعلانات الأكاديمية',
    excerpt: 'يسرنا الإعلان عن بدء استقبال طلبات الالتحاق للعام الدراسي القادم مع توفير منح دراسية تصل إلى 50% للطلبة الحاصلين على معدلات امتياز.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'يرجى مراجعة قسم التسجيل والقبول خلال ساعات الدوام الرسمي لاستكمال الطلبات والأوراق الثبوتية.' }],
        markDefs: []
      }
    ],
    isHero: false,
  },
  
  // Breaking News
  {
    _type: 'breakingNews',
    title: 'أكاديمية الباب العالي تعلن إطلاق برنامج خالد لريادة الأعمال ضمن احتفالية كبرى!',
    isActive: true
  },
  {
    _type: 'breakingNews',
    title: 'تسجيل الطلاب مستمر في قسم الأنشطة الرياضية للمشاركة في البطولات المدرسية.',
    isActive: true
  }
];

const payload = {
  mutations: articles.map(article => ({
    create: article
  }))
};

async function seed() {
  try {
    console.log('Sending request to Sanity API...');
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Sanity API Error: ${JSON.stringify(data)}`);
    }

    console.log('Successfully seeded database!');
    console.log(data);
  } catch (err) {
    console.error('Error seeding data:', err.message);
  }
}

seed();
