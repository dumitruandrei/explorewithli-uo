import {defineArrayMember, defineField, defineType} from 'sanity'

export const journalSection = defineType({
  name: 'journalSection',
  title: 'Journal Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      paragraphs: 'paragraphs',
    },
    prepare({heading, paragraphs}) {
      return {
        title: heading || 'Untitled section',
        subtitle: paragraphs?.length
          ? `${paragraphs.length} paragraph${paragraphs.length === 1 ? '' : 's'}`
          : undefined,
      }
    },
  },
})
