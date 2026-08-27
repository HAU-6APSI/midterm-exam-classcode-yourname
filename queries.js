// queries.js - reporting queries over the sightings database (Module 5).
//
// Each function returns rows. Some are finished; some are TODO. Run them all
// and print the results with `npm run queries`. The exam flags are built from
// the MEANING of your results, so any correct query earns the flag - you do
// not have to match a particular style, order, or column list.
import { pool } from './db.js'

// Every sighting, oldest id first. (Worked example - study this shape.)
export async function allSightings() {
  const result = await pool.query('SELECT * FROM sightings ORDER BY id')
  return result.rows
}

// TODO 3: return only the sightings that have MORE THAN 3 witnesses.
//         (Filter the rows with a condition on the witnesses column.)
export async function bigSightings() {
  return []
}

// TODO 4: return each sighting together with the CITY it happened in.
//         (The city lives in the locations table; connect the two tables on
//         the sighting's location_id.)
export async function withCity() {
  return []
}

// TODO 5: return how many sightings there are of EACH ghost_type.
//         (Group the rows by ghost_type and count each group.)
export async function countByType() {
  return []
}

// TODO 6: return the single MOST RECENT sighting (the latest reported_at).
export async function latestSighting() {
  return null
}

// Runner: prints each result so you can read your answers.
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('allSightings   ->', (await allSightings()).length, 'rows')
  console.log('bigSightings   ->', await bigSightings())
  console.log('withCity       ->', await withCity())
  console.log('countByType    ->', await countByType())
  console.log('latestSighting ->', await latestSighting())
  process.exit(0)
}
