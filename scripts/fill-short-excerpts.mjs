// Replaces placeholder greetings used as excerpts on three journal post drafts.
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/fill-short-excerpts.mjs [--apply]
const PROJECT = 'o7f7vu0c'
const DATASET = 'production'
const API = `https://${PROJECT}.api.sanity.io/v2026-06-15/data`
const TOKEN = process.env.SANITY_API_WRITE_TOKEN
const apply = process.argv.includes('--apply')

const excerpts = {
  'drafts.journalPost-best-gifts-to-bring-buy-from-chongqing':
    'Want to take a little piece of the mountain city home? As a born-and-raised Chongqing native, here are the gifts that truly represent our city, from fiery hotpot seasoning and Sichuan pepper to Shu embroidery, and where to buy each one.',
  'drafts.journalPost-the-ultimate-list-of-12-featured-streets-most-tourists-miss-plus-how-to-get-there':
    "Most itineraries stop at Jiefangbei and Hongya Cave. These are the featured streets I recommend to clients who want to dig deeper, from cliffside alleys to cyberpunk nightlife, with a vibe check and Metro directions for each.",
  'drafts.journalPost-walk-the-battlefields-your-three-kingdoms-history-tour-in-chongqing-china':
    'Chongqing was the heartland of the Shu Han kingdom. Follow Liu Bei, Zhuge Liang and Zhang Fei from Baidi City to Zhang Fei Temple, with the history behind each site and what to see when you get there.',
}

const query = `*[_id in $ids]{_id, excerpt}`
const res = await fetch(
  `${API}/query/${DATASET}?query=${encodeURIComponent(query)}&$ids=${encodeURIComponent(JSON.stringify(Object.keys(excerpts)))}&perspective=raw`,
  { headers: { Authorization: `Bearer ${TOKEN}` } },
)
const found = (await res.json()).result
for (const id of Object.keys(excerpts)) {
  const doc = found.find((d) => d._id === id)
  if (!doc) throw new Error(`Draft not found: ${id}`)
  console.log(`${id}\n  old: ${doc.excerpt}\n  new (${excerpts[id].length} chars): ${excerpts[id]}`)
}

if (!apply) {
  console.log('\nDry run. Re-run with --apply to write.')
  process.exit(0)
}

const mutations = Object.entries(excerpts).map(([id, excerpt]) => ({
  patch: { id, set: { excerpt } },
}))
const out = await fetch(`${API}/mutate/${DATASET}`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ mutations }),
})
if (!out.ok) throw new Error(`Mutation failed: ${out.status} ${await out.text()}`)
console.log('\nApplied:', (await out.json()).transactionId)
