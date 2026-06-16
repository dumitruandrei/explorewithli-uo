import {defineArrayMember, defineField, defineType} from 'sanity'

export const travelPackage = defineType({
  name: 'travelPackage',
  title: 'Travel Package',
  type: 'object',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Additional Gallery Images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
      description: 'Optional extra images for a slider / gallery scroll.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'itinerary',
      title: 'Day-by-Day Itinerary',
      type: 'array',
      of: [defineArrayMember({type: 'itineraryDay'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'durationDays',
      title: 'Duration (Days)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).integer(),
    }),
    defineField({
      name: 'groupPrice',
      title: 'Group Price (EUR per person, group of 4)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'string',
      description: 'e.g. "Best for first-time visitors and families."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tripHighlights',
      title: 'Trip Highlights',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Key highlights of the trip shown on the product card.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'included',
      title: 'What’s Included',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Items included in the tour price.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'notIncluded',
      title: 'What’s Not Included',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Items not included in the tour price.',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      durationDays: 'durationDays',
      media: 'image',
    },
    prepare({title, durationDays, media}) {
      return {
        title,
        subtitle: durationDays ? `${durationDays} days` : undefined,
        media,
      }
    },
  },
})
