import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'الأقسام',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'اسم القسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'الرابط الذكي للقسم (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'وصف القسم',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'ترتيب العرض (في شريط التنقل)',
      type: 'number',
      description: 'رقم لترتيب الأقسام (1 يظهر أولاً، 2 ثانياً، وهكذا)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
