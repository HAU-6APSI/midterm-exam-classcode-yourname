// flags.js - run your solved code and print a flag for each challenge.
//   npm run flags
// A LOCKED line means that TODO is not finished yet. Paste every HAU{...} flag
// you unlock into the Canvas exam.
import { app } from './app.js'
import { bigSightings, withCity, countByType, latestSighting } from './queries.js'
import { makeFlag } from './flaglib.js'

const realLog = console.log
console.log = () => {}  // mute the app's request logging; flags print at the end
const server = app.listen(0)
const base = `http://localhost:${server.address().port}`

async function api(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } }
  if (body) opts.body = JSON.stringify(body)
  const res = await fetch(base + path, opts)
  let json = null
  try { json = await res.json() } catch {}
  return { status: res.status, body: json }
}

const out = []
function emit(name, locked, value, todo) {
  if (locked) { out.push([name, `LOCKED - finish TODO ${todo}`]); return null }
  const f = makeFlag(name, value)
  out.push([name, f])
  return { name, value }
}

// 1. flag_list - the sightings list works out of the box. Free flag.
const list = await api('GET', '/sightings')
const solved = []
let f
f = emit('flag_list', !Array.isArray(list.body), { count: Array.isArray(list.body) ? list.body.length : 0 }, '-'); if (f) solved.push(f)

// 2 & 3. GET /sightings/:id and its 404 branch  (TODO 1)
const one = await api('GET', '/sightings/3')
f = emit('flag_one', one.status === 501, one.body, 1); if (f) solved.push(f)
const missing = await api('GET', '/sightings/999')
f = emit('flag_404', missing.status === 501, { status: missing.status }, 1); if (f) solved.push(f)

// 4 & 5. POST /sightings and the count afterwards  (TODO 2)
const created = await api('POST', '/sightings', { location_id: 2, ghost_type: 'orb', witnesses: 9, reported_at: '2026-06-01' })
f = emit('flag_create', created.status === 501, created.body, 2); if (f) solved.push(f)
const after = await api('GET', '/sightings')
f = emit('flag_count9', created.status === 501, { count: Array.isArray(after.body) ? after.body.length : 0 }, 2); if (f) solved.push(f)

// 6-9. the reporting queries  (TODO 3-6)
const big = await bigSightings()
f = emit('flag_big', !big || big.length === 0, big, 3); if (f) solved.push(f)
const city = await withCity()
f = emit('flag_city', !city || city.length === 0, city, 4); if (f) solved.push(f)
const types = await countByType()
f = emit('flag_types', !types || types.length === 0, types, 5); if (f) solved.push(f)
const latest = await latestSighting()
f = emit('flag_latest', !latest, latest, 6); if (f) solved.push(f)

// 10. master flag - only correct once every challenge above is solved.
const allSolved = solved.length === 9
emit('flag_master', !allSolved, solved.map(s => [s.name, stableFor(s.value)]), 'all')
function stableFor(v) { return v } // hashed by makeFlag's own stable()

console.log = realLog
console.log('Paste each HAU{...} flag into the Canvas exam. LOCKED = that TODO is not done.\n')
for (const [name, val] of out) console.log(name.padEnd(13), val)
server.close()
