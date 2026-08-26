// smoke.js - fire every API request once and print the status + body, so you
// can read exactly what your routes return. Run with `npm run smoke`.
import { app } from './app.js'

const server = app.listen(0)
const base = `http://localhost:${server.address().port}`

async function show(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(base + path, opts)
  const text = await res.text()
  console.log(`${method} ${path} -> ${res.status}  ${text.slice(0, 200)}`)
}

await show('GET', '/sightings')
await show('GET', '/sightings/3')
await show('GET', '/sightings/999')
await show('POST', '/sightings', { location_id: 2, ghost_type: 'orb', witnesses: 9, reported_at: '2026-06-01' })
server.close()
