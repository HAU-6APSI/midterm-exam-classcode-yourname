// queries.js - reporting queries over the sightings database (Module 5).
//
// Each function returns rows. Some are finished; some are TODO. Run them all
// and print the results with `npm run queries`.
import { pool } from './db.js'

// Every sighting, oldest first. (Worked example.)
export async function allSightings() {
  const result = await pool.query('SELECT * FROM sightings ORDER BY id')
  return result.rows
}

// TODO 3: return only the sightings with MORE THAN 3 witnesses.
export async function bigSightings() {
  // Hint: SELECT * FROM sightings WHERE witnesses > $1, with [3].
  return []
}

// TODO 4: return each sighting joined to WHERE it happened, as rows of
//         { id, ghost_type, city }. Join sightings to locations on
//         sightings.location_id = locations.id.
export async function withCity() {
  // Hint: SELECT s.id, s.ghost_type, l.city
  //       FROM sightings s JOIN locations l ON s.location_id = l.id
  //       ORDER BY s.id;
  return []
}

// TODO 5: return how many sightings there are of each ghost_type, as rows of
//         { ghost_type, count }, most common first.
export async function countByType() {
  // Hint: SELECT ghost_type, COUNT(*) AS count FROM sightings
  //       GROUP BY ghost_type ORDER BY count DESC;
  return []
}

// TODO 6: return the single MOST RECENT sighting (latest reported_at).
export async function latestSighting() {
  // Hint: ORDER BY reported_at DESC LIMIT 1. Return result.rows[0].
  return null
}

// Runner: prints each result so you can read the answers.
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('allSightings   ->', (await allSightings()).length, 'rows')
  console.log('bigSightings   ->', await bigSightings())
  console.log('withCity       ->', await withCity())
  console.log('countByType    ->', await countByType())
  console.log('latestSighting ->', await latestSighting())
  process.exit(0)
}
