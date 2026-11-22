import {defineArrayMember, defineField, defineType} from 'sanity'

import {altField, urlSlugOptions, urlSlugValidation} from './fields'

export const journalPost = defineType({
  name: 'journalPost',
  title: 'Journal Post',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      fields: [altField],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryRef',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    // Legacy text fields stay until the live site reads the new fields; hidden once migrated.
    defineField({
      name: 'category',
      title: 'Category (legacy text)',
      type: 'string',
      readOnly: true,
      hidden: ({document}) => Boolean(document?.categoryRef),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "6 min read"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorRef',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author (legacy text)',
      type: 'string',
      readOnly: true,
      hidden: ({document}) => Boolean(document?.authorRef),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'array',
      description: 'Use "Heading 2" for section titles.',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'richTableBlock'}),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'content',
      title: 'Article Content (legacy sections)',
      type: 'array',
      of: [
        defineArrayMember({type: 'journalSection'}),
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'richTableBlock'}),
      ],
      readOnly: true,
      hidden: ({document}) => Array.isArray(document?.body) && document.body.length > 0,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      description:
        'The homepage journal section highlights one featured article.',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
      description: 'Add tags to help categorize and filter this post',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryRef.title',
      media: 'image',
    },
  },
})
