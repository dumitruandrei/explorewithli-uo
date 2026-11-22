import {defineField, defineType} from 'sanity'

import {altField, urlSlugOptions, urlSlugValidation} from './fields'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', ...urlSlugOptions},
      validation: urlSlugValidation,
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'One or two sentences about the author, shown to readers and search engines.',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [altField],
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})
