// flags.js - run your solved code and print a flag for each challenge.
//   npm run flags
// A LOCKED line means that TODO is not finished yet. Paste every HAU{...} flag
// you unlock into the Canvas exam.
//
// Each flag is built from the MEANING of your result (the ids, the counts, the
// city per sighting), not from how you wrote the SQL. So any correct solution -
// with or without ORDER BY, COUNT(*) or COUNT(*)::int, SELECT * or named
// columns - earns the same flag.
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

const N = v => Number(v)
const rows = x => (Array.isArray(x) ? x : [])

const out = []
const solved = []
function emit(name, locked, value, todo) {
  if (locked) { out.push([name, `LOCKED - finish TODO ${todo}`]); return }
  out.push([name, makeFlag(name, value)])
  solved.push({ name, value })
}

// 1. flag_list - the list route works out of the box. Free flag.
const list = await api('GET', '/sightings')
emit('flag_list', !Array.isArray(list.body), { count: rows(list.body).length }, '-')

// 2 & 3. GET /sightings/:id and its 404 branch  (TODO 1)
const one = await api('GET', '/sightings/3')
emit('flag_one', one.status === 501, { id: N(one.body?.id), ghost_type: one.body?.ghost_type, witnesses: N(one.body?.witnesses) }, 1)
const missing = await api('GET', '/sightings/999')
emit('flag_404', missing.status === 501, { status: missing.status }, 1)

// 4 & 5. POST /sightings and the count afterwards  (TODO 2)
const created = await api('POST', '/sightings', { location_id: 2, ghost_type: 'orb', witnesses: 9, reported_at: '2026-06-01' })
emit('flag_create', created.status === 501, { id: N(created.body?.id), ghost_type: created.body?.ghost_type, witnesses: N(created.body?.witnesses) }, 2)
const after = await api('GET', '/sightings')
emit('flag_count9', created.status === 501, { count: rows(after.body).length }, 2)

// 6-9. the reporting queries  (TODO 3-6). Normalized so any correct SQL matches.
const big = await bigSightings()
emit('flag_big', rows(big).length === 0, rows(big).map(r => N(r.id)).sort((a, b) => a - b), 3)
const city = await withCity()
emit('flag_city', rows(city).length === 0, rows(city).map(r => ({ id: N(r.id), city: r.city })).sort((a, b) => a.id - b.id), 4)
const types = await countByType()
emit('flag_types', rows(types).length === 0, Object.fromEntries(rows(types).map(r => [r.ghost_type, N(r.count)])), 5)
const latest = await latestSighting()
emit('flag_latest', !latest, { id: N(latest?.id) }, 6)

// 10. master flag - only once every challenge above is solved.
emit('flag_master', solved.length !== 9, solved.map(s => [s.name, s.value]), 'all')

console.log = realLog
console.log('Paste each HAU{...} flag into the Canvas exam. LOCKED = that TODO is not done.\n')
for (const [name, val] of out) console.log(name.padEnd(13), val)
server.close()
