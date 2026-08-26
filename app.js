// app.js - the HAUnted Sightings REST API (Module 4).
//
// Some routes are finished as worked examples. Two are marked TODO: complete
// them so the API behaves as described. Run the server with `npm start`, or
// run `npm run smoke` to fire every request at once and print the results.
import express from 'express'
import { pool } from './db.js'

export const app = express()
app.use(express.json())

// A tiny logging middleware. It runs on every request, then calls next() to
// hand control to the matching route. (Worked example - do not change.)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// GET /sightings - list every sighting. (Worked example.)
app.get('/sightings', async (req, res) => {
  const result = await pool.query('SELECT * FROM sightings ORDER BY id')
  res.json(result.rows)
})

// GET /sightings/:id - return ONE sighting by its id.
// TODO 1: query for the row whose id is req.params.id. If no row comes back,
//         respond with status 404 and { error: 'not found' }. Otherwise send
//         the single row object (status 200 is the default).
app.get('/sightings/:id', async (req, res) => {
  // Hint: SELECT * FROM sightings WHERE id = $1, with [req.params.id].
  //       result.rows[0] is the row, or undefined if there is none.
  res.status(501).json({ error: 'TODO 1 not done' })
})

// POST /sightings - create a new sighting from the JSON body.
// TODO 2: insert a row using the four values from req.body
//         (location_id, ghost_type, witnesses, reported_at) and respond with
//         the CORRECT status code for a newly created resource, sending back
//         the created row.
app.post('/sightings', async (req, res) => {
  // Hint: INSERT INTO sightings (location_id, ghost_type, witnesses, reported_at)
  //       VALUES ($1, $2, $3, $4) RETURNING *  -- result.rows[0] is the new row.
  //       What status code means "created"?
  res.status(501).json({ error: 'TODO 2 not done' })
})

// Start listening only when run directly (not when imported by smoke.js).
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(3000, () => console.log('HAUnted Sightings API on http://localhost:3000'))
}
