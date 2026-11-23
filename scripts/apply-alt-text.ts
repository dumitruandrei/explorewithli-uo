import {getCliClient} from 'sanity/cli'
import altText from './alt-text.json'

type AltEntry = {
  id: number
  alt: string
  verify: boolean
  targets: {docId: string; path: string}[]
}

const client = getCliClient({apiVersion: '2026-06-15'})
const overwrite = process.argv.includes('--overwrite')
const dryRun = process.argv.includes('--dry-run')

async function main() {
  const byDoc = new Map<string, Record<string, string>>()
  for (const entry of altText as AltEntry[]) {
    for (const {docId, path} of entry.targets) {
      const fields = byDoc.get(docId) ?? {}
      fields[path] = entry.alt
      byDoc.set(docId, fields)
    }
  }

  // setIfMissing leaves alt text already written in the Studio untouched unless --overwrite is passed.
  const tx = client.transaction()
  for (const [docId, fields] of byDoc) {
    tx.patch(docId, (p) => (overwrite ? p.set(fields) : p.setIfMissing(fields)))
  }

  const count = [...byDoc.values()].reduce((n, f) => n + Object.keys(f).length, 0)
  console.log(`${count} alt fields across ${byDoc.size} documents (${overwrite ? 'overwrite' : 'fill empty only'})`)
  if (dryRun) return

  await tx.commit({visibility: 'async'})
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
