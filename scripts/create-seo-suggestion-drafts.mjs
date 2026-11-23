// Creates unpublished Sanity drafts holding suggested SEO titles/descriptions, destination descriptions and post tags.
// Published documents are never modified; owners review each draft in Studio and publish or discard it.
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/create-seo-suggestion-drafts.mjs [--apply]
import {readFile} from 'node:fs/promises'
import {createClient} from 'next-sanity'

const apply = process.argv.includes('--apply')
const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required (drafts are only readable with a token)')

const client = createClient({
  projectId: 'o7f7vu0c',
  dataset: 'production',
  apiVersion: '2026-06-15',
  useCdn: false,
  token,
  perspective: 'raw',
})

const readJson = async (file) => JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'))
const seoDrafts = await readJson('./seo-content-drafts.json')
const tagSuggestions = await readJson('./seo-tag-suggestions.json')

const changes = new Map()
const addChange = (id, change) => changes.set(id, {...changes.get(id), ...change})

for (const [id, seo] of Object.entries(seoDrafts.journalPost ?? {})) addChange(id, {seo})
for (const [id, fields] of Object.entries(seoDrafts.destination ?? {})) addChange(id, fields)
for (const [id, tags] of Object.entries(tagSuggestions)) addChange(id, {tags})

const ids = [...changes.keys()]
const docs = await client.fetch(`*[_id in $ids || _id in $draftIds]`, {
  ids,
  draftIds: ids.map((id) => `drafts.${id}`),
})
const byId = new Map(docs.map((doc) => [doc._id, doc]))

const tx = client.transaction()
const report = []
for (const [id, change] of changes) {
  const published = byId.get(id)
  if (!published) {
    report.push({id, status: 'missing published document'})
    continue
  }
  if (`drafts.${id}`.length > 128) {
    report.push({title: published.title?.slice(0, 60), status: 'skipped: ID too long for a draft'})
    continue
  }
  if (byId.has(`drafts.${id}`)) {
    report.push({id, status: 'skipped: draft already exists'})
    continue
  }
  const {_rev, _createdAt, _updatedAt, ...base} = published
  const draft = {...base, _id: `drafts.${id}`}
  if (change.seo) draft.seo = {_type: 'seo', ...published.seo, ...change.seo}
  if (change.description) draft.description = change.description
  if (change.tags) draft.tags = change.tags
  tx.create(draft)
  report.push({
    title: published.title?.slice(0, 60),
    type: published._type,
    changed: Object.keys(change).join(', '),
    status: 'draft',
  })
}

console.table(report)
const drafts = report.filter((row) => row.status === 'draft').length
if (apply && drafts) {
  const result = await tx.commit({visibility: 'sync'})
  console.log(`Created ${result.results.length} drafts (transaction ${result.transactionId})`)
} else {
  console.log(`Dry run: ${drafts} drafts would be created. Re-run with --apply to write.`)
}
