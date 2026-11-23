// Writes the reviewed alt text from alt-text.json into unpublished drafts so owners can review and publish it in Studio.
// Published documents are never modified. An existing draft is reused; otherwise a draft is created from the published copy.
// Alt text already filled in is left alone unless --overwrite is passed.
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/apply-alt-text-drafts.mjs [--apply] [--overwrite]
import {readFile} from 'node:fs/promises'
import {createClient} from 'next-sanity'

const apply = process.argv.includes('--apply')
const overwrite = process.argv.includes('--overwrite')
const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is required')

const client = createClient({
  projectId: 'o7f7vu0c',
  dataset: 'production',
  apiVersion: '2026-06-15',
  useCdn: false,
  token,
  perspective: 'raw',
})

const altText = JSON.parse(await readFile(new URL('./alt-text.json', import.meta.url), 'utf8'))

const fieldsByDoc = new Map()
for (const entry of altText) {
  for (const {docId, path} of entry.targets) {
    fieldsByDoc.set(docId, {...fieldsByDoc.get(docId), [path]: entry.alt})
  }
}

const ids = [...fieldsByDoc.keys()]
const docs = await client.fetch(`*[_id in $ids || _id in $draftIds]`, {
  ids,
  draftIds: ids.map((id) => `drafts.${id}`),
})
const byId = new Map(docs.map((doc) => [doc._id, doc]))

const tx = client.transaction()
const missing = []
let reused = 0
let created = 0
let fieldCount = 0
for (const [id, fields] of fieldsByDoc) {
  const draftId = `drafts.${id}`
  const published = byId.get(id)
  const draft = byId.get(draftId)
  if (!published && !draft) {
    missing.push(id)
    continue
  }
  if (draft) {
    reused++
  } else {
    const {_id, _rev, _createdAt, _updatedAt, ...rest} = published
    tx.createIfNotExists({...rest, _id: draftId})
    created++
  }
  tx.patch(draftId, (p) => (overwrite ? p.set(fields) : p.setIfMissing(fields)))
  fieldCount += Object.keys(fields).length
}

console.log(
  `${fieldCount} alt fields across ${fieldsByDoc.size - missing.length} documents ` +
    `(${reused} existing drafts, ${created} new drafts, ${overwrite ? 'overwrite' : 'fill empty only'})`,
)
if (missing.length) console.log('Target documents not found:', missing)
if (!apply) {
  console.log('Dry run. Pass --apply to write.')
} else {
  await tx.commit({visibility: 'sync'})
  console.log('Done.')
}
