export const articleType = {
  name: 'article',
  title: 'المقالات',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'العنوان',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'slug',
      title: 'الرابط الدائم (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'category',
      title: 'القسم',
      type: 'string',
      options: {
        list: [
          {title: 'قسم الذكاء الاصطناعي', value: 'قسم الذكاء الاصطناعي'},
          {title: 'قسم العلوم', value: 'قسم العلوم'},
          {title: 'الريادة والابتكار', value: 'الريادة والابتكار'},
          {title: 'الأنشطة المدرسية', value: 'الأنشطة المدرسية'},
          {title: 'إعلانات الأكاديمية', value: 'إعلانات الأكاديمية'},
        ],
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'excerpt',
      title: 'مقتطف (ملخص قصير)',
      type: 'text',
    },
    {
      name: 'mainImage',
      title: 'الصورة الرئيسية',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'المحتوى',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'isHero',
      title: 'هل هذا هو الخبر الرئيسي؟',
      type: 'boolean',
      description: 'سيتم عرض الخبر في قسم القصة الرئيسية إذا تم تفعيله.',
      initialValue: false,
    }
  ],
}
