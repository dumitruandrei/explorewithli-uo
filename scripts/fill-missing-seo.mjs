// Fills missing SEO titles/descriptions on journal post drafts and moves
// descriptions that were saved under the wrong key (seo.excerpt) into seo.metaDescription.
// Usage: node --env-file-if-exists=/vercel/share/.env.project scripts/fill-missing-seo.mjs [--apply]
import { readFileSync, writeFileSync } from 'node:fs'

const PROJECT = 'o7f7vu0c'
const DATASET = 'production'
const API = `https://${PROJECT}.api.sanity.io/v2026-06-15/data`
const TOKEN = process.env.SANITY_API_WRITE_TOKEN
const apply = process.argv.includes('--apply')
const draftsFile = new URL('./seo-content-drafts.json', import.meta.url)

const additions = {
  '0693be5f-c2a3-4bb7-95bb-6eb2813f6703': {
    metaTitle: 'Gluten-Free Travel in China: A Celiac Guide',
  },
  'e116a811-13fe-4dfe-96c9-f61dd6e189bc': {
    metaTitle: 'Slowing Down in Shaxi, Yunnan: A Tea Horse Road Village',
  },
  'journalPost-best-place-to-visit-in-chongqing': {
    metaTitle: 'Best Places to Visit in Chongqing, by a Local',
  },
  'journalPost-beyond-the-bling-authentic-chongqing-outside-of-jiefangbei': {
    metaTitle: 'Authentic Chongqing Beyond Jiefangbei',
  },
  'journalPost-china-travel-2025-navigating-china-30-day-visa-free-travel': {
    metaTitle: "China's 30-Day Visa-Free Travel: Who Qualifies",
  },
  'journalPost-direct-flights-from-europe-to-chongqing': {
    metaTitle: 'Direct Flights from Europe to Chongqing, China',
  },
  'journalPost-your-ultimate-packing-guide-for-chongqing': {
    metaTitle: 'Packing Guide for Chongqing: What to Bring',
  },
  'journalPost-best-gifts-to-bring-buy-from-chongqing': {
    metaTitle: 'Best Gifts to Buy in Chongqing, by a Local',
  },
  '0a036694-3e2c-4f8c-8727-94b3c6689e02': {
    metaDescription:
      'Escape the crowds in 5 hidden gem towns in Guizhou and Yunnan, from karst canyons and ancient tea seas to borderland oceans of cloud.',
  },
  '41b1d5e4-c73c-4215-b231-3a6c5c14b322': {
    metaDescription:
      'The culture shocks to expect in China, from bringing your own drinks to restaurants to scenic park shuttles, plus food and budget transport tips.',
  },
  'bd02357d-d6b0-418e-8ce7-fffb13fdd37e': {
    metaDescription:
      "Yunnan's food geography explained: specialty coffee, aged Pu'er tea, seasonal wild mushroom feasts and ethnic cuisine in southwest China.",
  },
  'e92d4dc1-878a-4066-b167-5497ab380c72': {
    metaDescription:
      'Why Yunnan is redefining luxury travel: ancient Tea Horse Road towns, Tibetan culture and authentic experiences beyond the postcard.',
  },
  'ffb1999b-b681-4ff8-bea1-44a1ec448c16': {
    metaDescription:
      "Which Chongqing train station do you need? A guide to the city's 5 rail hubs for trains to Chengdu, Guilin, Zhangjiajie and beyond.",
  },
  'journalPost-wechat-and-alipay-set-up': {
    metaDescription:
      'How to set up WeChat Pay and Alipay with a foreign credit card: a step-by-step guide to cashless payments in China for international travelers.',
  },
}

async function query(groq, params = {}) {
  const qs = new URLSearchParams({ query: groq, perspective: 'raw' })
  for (const [k, v] of Object.entries(params)) qs.set(`$${k}`, JSON.stringify(v))
  const res = await fetch(`${API}/query/${DATASET}?${qs}`, { headers: { Authorization: `Bearer ${TOKEN}` } })
  if (!res.ok) throw new Error(`Query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

const drafts = await query(`*[_type == "journalPost" && _id in path("drafts.**")]{_id, seo}`)
const fileData = JSON.parse(readFileSync(draftsFile, 'utf8'))
const mutations = []
const problems = []

for (const draft of drafts) {
  const id = draft._id.replace(/^drafts\./, '')
  const seo = draft.seo ?? {}
  const set = {}
  const unset = []

  if (seo.excerpt) {
    if (!seo.metaDescription) set['seo.metaDescription'] = seo.excerpt
    unset.push('seo.excerpt')
  }
  for (const [field, value] of Object.entries(additions[id] ?? {})) {
    if (!seo[field]) set[`seo.${field}`] = value
  }

  const title = set['seo.metaTitle'] ?? seo.metaTitle
  const description = set['seo.metaDescription'] ?? seo.metaDescription
  if (!title) problems.push(`${id}: no meta title`)
  else if (title.length > 60) problems.push(`${id}: title ${title.length} chars`)
  if (!description) problems.push(`${id}: no meta description`)
  else if (description.length < 70 || description.length > 155) problems.push(`${id}: description ${description.length} chars`)

  if (!Object.keys(set).length && !unset.length) continue
  console.log(`${id}`)
  for (const [k, v] of Object.entries(set)) console.log(`  set ${k} (${v.length}): ${v}`)
  for (const k of unset) console.log(`  unset ${k}`)

  const patch = { id: draft._id }
  if (Object.keys(set).length) patch.set = set
  if (unset.length) patch.unset = unset
  mutations.push({ patch })

  const entry = (fileData.journalPost[id] ??= {})
  if (entry.excerpt) {
    entry.metaDescription ??= entry.excerpt
    delete entry.excerpt
  }
  for (const [k, v] of Object.entries(set)) entry[k.replace('seo.', '')] = v
}

console.log(`\n${mutations.length} drafts to patch, ${drafts.length} drafts checked`)
if (problems.length) {
  console.log('Problems:\n  ' + problems.join('\n  '))
  process.exit(1)
}
if (!apply) {
  console.log('Dry run. Re-run with --apply to write.')
  process.exit(0)
}

const res = await fetch(`${API}/mutate/${DATASET}`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ mutations }),
})
if (!res.ok) throw new Error(`Mutation failed: ${res.status} ${await res.text()}`)
writeFileSync(draftsFile, JSON.stringify(fileData, null, 2) + '\n')
console.log('Applied.')
