// One-off: reassigns every post by "Li" to "Hanghang", deletes the Li author, and recreates the
// dialect-phrases post under a shorter document ID (its old ID was too long for Studio drafts).
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/merge-li-into-hanghang.mjs [--apply]
import {createClient} from 'next-sanity'

const apply = process.argv.includes('--apply')
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

const FROM_AUTHOR = 'author-li'
const TO_AUTHOR = 'author-hanghang'
const TO_NAME = 'Hanghang'
const OLD_DIALECT_ID =
  'journalPost-try-these-basic-chongqing-dialect-phrases-on-your-next-chongqing-trip-waitress-aunties-might-give-you-more-food'
const NEW_DIALECT_ID = 'journalPost-chongqing-dialect-phrases'

const authorFields = {authorRef: {_type: 'reference', _ref: TO_AUTHOR}, author: TO_NAME}
const byLi = (doc) => doc.authorRef?._ref === FROM_AUTHOR || doc.author?.trim() === 'Li'

const docs = await client.fetch(
  `*[authorRef._ref == $from || author == "Li" || _id in $dialectIds]`,
  {from: FROM_AUTHOR, dialectIds: [OLD_DIALECT_ID, `drafts.${OLD_DIALECT_ID}`, NEW_DIALECT_ID]},
)

if (docs.some((doc) => doc._id === NEW_DIALECT_ID)) throw new Error(`${NEW_DIALECT_ID} already exists`)
const oldDialect = docs.find((doc) => doc._id === OLD_DIALECT_ID)
if (!oldDialect) throw new Error('Dialect post not found')

const tx = client.transaction()
const report = []

for (const doc of docs) {
  if (doc._id === OLD_DIALECT_ID || doc._id === `drafts.${OLD_DIALECT_ID}`) continue
  if (!byLi(doc)) continue
  tx.patch(doc._id, (patch) => patch.set(authorFields))
  report.push({id: doc._id.slice(0, 70), title: doc.title?.slice(0, 45), action: 'author → Hanghang'})
}

const {_id, _rev, _createdAt, _updatedAt, ...dialectFields} = oldDialect
tx.create({...dialectFields, ...(byLi(oldDialect) ? authorFields : {}), _id: NEW_DIALECT_ID})
tx.delete(OLD_DIALECT_ID)
report.push({id: NEW_DIALECT_ID, title: oldDialect.title?.slice(0, 45), action: 'recreated with short ID'})

console.table(report)
if (!apply) {
  console.log(`Dry run: ${report.length} changes, then delete ${FROM_AUTHOR}. Re-run with --apply to write.`)
  process.exit(0)
}

const result = await tx.commit({visibility: 'sync'})
console.log(`Applied ${result.results.length} mutations (transaction ${result.transactionId})`)

const remaining = await client.fetch(`count(*[references($from)])`, {from: FROM_AUTHOR})
if (remaining > 0) throw new Error(`${remaining} documents still reference ${FROM_AUTHOR}; not deleting it`)
await client.delete(FROM_AUTHOR)
console.log(`Deleted ${FROM_AUTHOR}`)
