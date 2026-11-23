// Adds category/author reference docs and a flat Portable Text `body` to every journal post.
// Legacy fields (category, author, content) are left untouched so the current live site keeps working.
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/migrate-journal-content.mjs [--apply]
import {createClient} from 'next-sanity'

const apply = process.argv.includes('--apply')
const token = process.env.SANITY_API_WRITE_TOKEN
if (apply && !token) throw new Error('SANITY_API_WRITE_TOKEN is required for --apply')

const client = createClient({
  projectId: 'o7f7vu0c',
  dataset: 'production',
  apiVersion: '2026-06-15',
  useCdn: false,
  token,
})

const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const textBlock = (key, text, style = 'normal') => ({
  _type: 'block',
  _key: key,
  style,
  markDefs: [],
  children: [{_type: 'span', _key: `${key}s`, text, marks: []}],
})

function toBody(content = []) {
  const body = []
  content.forEach((item, i) => {
    if (item._type === 'journalSection') {
      if (item.heading?.trim()) body.push(textBlock(`m${i}h`, item.heading.trim(), 'h2'))
      ;(item.paragraphs ?? []).forEach((paragraph, p) => {
        if (typeof paragraph === 'string' && paragraph.trim()) {
          body.push(textBlock(`m${i}p${p}`, paragraph.trim()))
        }
      })
    } else {
      body.push(item)
    }
  })
  return body
}

const posts = await client.fetch(
  `*[_type == "journalPost" && !(_id in path("drafts.**"))]{_id, title, category, author, content, categoryRef, authorRef, body}`,
)

const categories = new Map()
const authors = new Map()
for (const post of posts) {
  const category = post.category?.trim()
  const author = post.author?.trim()
  if (category) categories.set(slugify(category), category)
  if (author) authors.set(slugify(author), author)
}

const tx = client.transaction()
for (const [slug, title] of categories) {
  tx.createIfNotExists({_id: `category-${slug}`, _type: 'category', title, slug: {_type: 'slug', current: slug}})
}
for (const [slug, name] of authors) {
  tx.createIfNotExists({_id: `author-${slug}`, _type: 'author', name, slug: {_type: 'slug', current: slug}})
}

const report = []
for (const post of posts) {
  const set = {}
  const category = post.category?.trim()
  const author = post.author?.trim()
  if (!post.categoryRef && category) {
    set.categoryRef = {_type: 'reference', _ref: `category-${slugify(category)}`}
  }
  if (!post.authorRef && author) {
    set.authorRef = {_type: 'reference', _ref: `author-${slugify(author)}`}
  }
  if (!post.body?.length && post.content?.length) set.body = toBody(post.content)
  if (Object.keys(set).length) {
    tx.patch(post._id, (patch) => patch.set(set))
    report.push({
      title: post.title,
      category: set.categoryRef?._ref,
      author: set.authorRef?._ref,
      bodyBlocks: set.body?.length,
      legacyItems: post.content?.length,
    })
  }
}

console.log(`Categories: ${[...categories.values()].join(', ')}`)
console.log(`Authors: ${[...authors.values()].join(', ')}`)
console.table(report)

if (apply) {
  const result = await tx.commit({visibility: 'sync'})
  console.log(`Committed transaction ${result.transactionId} (${result.results.length} mutations)`)
} else {
  console.log('Dry run only. Re-run with --apply to write.')
}
