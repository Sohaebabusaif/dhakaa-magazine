import { defineField, defineType } from 'sanity'

export const studentAlertType = defineType({
  name: 'studentAlert',
  title: 'تنبيه للطلبة',
  type: 'document',
  fields: [
    defineField({
      name: 'isActive',
      title: 'تفعيل التنبيه',
      description: 'قم بإيقاف هذا الخيار لإخفاء التنبيه من الموقع تماماً',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badgeText',
      title: 'النص التحذيري الصغير (فوق العنوان)',
      type: 'string',
      initialValue: 'تنبيه هام للطلبة',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'العنوان الرئيسي',
      type: 'string',
      initialValue: 'مواعيد الامتحانات النصفية تقترب',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'تفاصيل التنبيه',
      type: 'text',
      initialValue: 'نذكر أبنائنا الطلبة بضرورة الاستعداد الجيد للامتحانات القادمة والالتزام بجداول المراجعة المعتمدة.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'أزرار التنبيه',
      description: 'أضف زرين كحد أقصى (مثال: جدول الامتحانات، دليل المراجعة)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'اسم الزر',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'أيقونة الزر (إيموجي)',
              type: 'string',
              description: 'ضع إيموجي يمثل الزر (مثال: 📅 أو 📚)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'الرابط',
              type: 'url',
              validation: (Rule) => Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url', media: 'icon' },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle,
                media: media // Just pass the string
              }
            }
          }
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
    },
    prepare({ title, isActive }) {
      return {
        title: title,
        subtitle: isActive ? '🟢 مفعل' : '🔴 معطل',
      }
    },
  },
})
