import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'إعدادات الموقع',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'اسم الموقع',
      type: 'string',
      initialValue: 'ذكاء الباب العالي',
    }),
    defineField({
      name: 'siteDescription',
      title: 'وصف الموقع',
      type: 'text',
      initialValue: 'المجلة الأسبوعية الأولى للتقنية والذكاء الاصطناعي من أكاديمية الباب العالي للتميز. نضع المستقبل بين يديك.',
    }),
    defineField({
      name: 'editorName',
      title: 'رئيس التحرير',
      type: 'string',
      initialValue: 'صهيب الشياب',
    }),
    defineField({
      name: 'location',
      title: 'الموقع الجغرافي',
      type: 'string',
      initialValue: 'عمّان، الأردن',
    }),
    defineField({
      name: 'copyrightText',
      title: 'نص حقوق النشر',
      type: 'string',
      initialValue: 'مجلة ذكاء الباب العالي (HGA DHAKAA). جميع الحقوق محفوظة لأكاديمية الباب العالي للتميز.',
    }),
    defineField({
      name: 'footerLinks',
      title: 'روابط الشريط السفلي',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'عنوان الرابط',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'عنوان URL',
              type: 'url',
              validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'روابط التواصل الاجتماعي',
      type: 'object',
      fields: [
        defineField({
          name: 'whatsapp',
          title: 'رابط واتساب',
          type: 'url',
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'twitter',
          title: 'رابط إكس (X) / تويتر',
          type: 'url',
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
        }),
        defineField({
          name: 'email',
          title: 'البريد الإلكتروني',
          type: 'string',
        }),
        defineField({
          name: 'instagram',
          title: 'رابط إنستغرام',
          type: 'url',
          validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
        }),
      ],
    }),
    defineField({
      name: 'showShareButtons',
      title: 'إظهار أزرار المشاركة',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showQuickLinks',
      title: 'إظهار الروابط السريعة',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'إعدادات الموقع' }
    },
  },
})
