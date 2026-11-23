import {defineField, defineType} from 'sanity'

import {altField} from '../fields'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  description:
    'Optional. Overrides what Google and social networks show. Leave empty to use the title, description and main image.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown as the blue link in Google. Aim for 30 to 60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Google usually cuts titles off after about 60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown under the link in Google. Aim for 70 to 155 characters.',
      validation: (Rule) => [
        Rule.max(155).warning('Google usually cuts descriptions off after about 155 characters.'),
        Rule.min(70).warning('Short descriptions are often replaced by Google with random page text.'),
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Shown when the page is shared on WhatsApp, Facebook, LinkedIn etc. Best at 1200 × 630.',
      options: {hotspot: true},
      fields: [altField],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Turn on for pages that should not appear in Google, such as drafts or duplicates.',
      initialValue: false,
    }),
  ],
})
