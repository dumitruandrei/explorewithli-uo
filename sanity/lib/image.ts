import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

export function sanityImageUrl(
  source: SanityImageSource | null | undefined,
  { width, height }: { width: number; height?: number },
): string {
  if (!source) return '/placeholder.svg'
  let image = urlFor(source).width(width)
  if (height) image = image.height(height)
  return image.url()
}
