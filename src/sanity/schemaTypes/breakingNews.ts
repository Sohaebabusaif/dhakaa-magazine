export const breakingNewsType = {
  name: 'breakingNews',
  title: 'الأخبار العاجلة',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'نص الخبر العاجل',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'isActive',
      title: 'مفعل',
      type: 'boolean',
      initialValue: true,
    }
  ],
}
