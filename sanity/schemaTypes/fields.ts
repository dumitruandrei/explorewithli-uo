import {defineField, type SlugRule} from 'sanity'

import {URL_SLUG_PATTERN, toUrlSlug} from '../../lib/slug'

export const altField = defineField({
  name: 'alt',
  title: 'Alt text',
  type: 'string',
  description:
    'Describe what the photo shows for screen readers and Google Images, e.g. "Hongya Cave lit up at night above the Jialing River". Leave empty only if the image is purely decorative.',
  validation: (Rule) =>
    Rule.max(160).warning('Keep alt text under about 160 characters.'),
})

export const urlSlugOptions = {
  maxLength: 96,
  slugify: (input: string) => toUrlSlug(input),
}

export const urlSlugValidation = (Rule: SlugRule) =>
  Rule.required().custom((value) => {
    const current = value?.current
    if (!current || URL_SLUG_PATTERN.test(current)) return true
    return {
      message: `Use lowercase letters, numbers and dashes. The site will publish this as "${toUrlSlug(current)}". Click Generate to fix it.`,
      level: 'warning',
    }
  })
