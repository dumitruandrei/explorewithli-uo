export const URL_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** "Dali, Lijiang & Shangri-La 6-Day" -> "dali-lijiang-and-shangri-la-6-day" */
export function toUrlSlug(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}
