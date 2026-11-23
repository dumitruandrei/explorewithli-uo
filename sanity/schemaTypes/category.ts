import {defineField, defineType} from 'sanity'

import {urlSlugOptions, urlSlugValidation} from './fields'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', ...urlSlugOptions},
      validation: urlSlugValidation,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short summary of what posts in this category cover.',
    }),
  ],
})
