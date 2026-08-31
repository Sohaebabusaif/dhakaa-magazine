import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'
import {projectId, dataset} from './src/sanity/env'

// Define the custom structure
const myStructure = (S: any) =>
  S.list()
    .title('إدارة المحتوى')
    .items([
      S.listItem()
        .title('قسم الذكاء الاصطناعي')
        .child(
          S.documentList()
            .title('الذكاء الاصطناعي')
            .filter('_type == "article" && category == "قسم الذكاء الاصطناعي"')
        ),
      S.listItem()
        .title('قسم العلوم')
        .child(
          S.documentList()
            .title('العلوم')
            .filter('_type == "article" && category == "قسم العلوم"')
        ),
      S.listItem()
        .title('الريادة والابتكار')
        .child(
          S.documentList()
            .title('الريادة والابتكار')
            .filter('_type == "article" && category == "الريادة والابتكار"')
        ),
      S.listItem()
        .title('الأنشطة المدرسية')
        .child(
          S.documentList()
            .title('الأنشطة المدرسية')
            .filter('_type == "article" && category == "الأنشطة المدرسية"')
        ),
      S.listItem()
        .title('إعلانات الأكاديمية')
        .child(
          S.documentList()
            .title('إعلانات الأكاديمية')
            .filter('_type == "article" && category == "إعلانات الأكاديمية"')
        ),
      S.divider(),
      S.listItem()
        .title('كافة المقالات')
        .child(S.documentTypeList('article').title('كافة المقالات')),
      S.listItem()
        .title('الأخبار العاجلة')
        .child(S.documentTypeList('breakingNews').title('الأخبار العاجلة')),
    ])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({structure: myStructure}),
    visionTool({defaultApiVersion: '2024-01-01'}),
  ],
})
