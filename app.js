// app.js - the HAUnted Sightings REST API (Module 4).
//
// Some routes are finished as worked examples. Two are marked TODO: complete
// them so the API behaves as described. Run the server with `npm start`, or
// run `npm run smoke` to fire every API request at once and print the results.
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

// GET /sightings - list every sighting. (Worked example - study this shape.)
app.get('/sightings', async (req, res) => {
  const result = await pool.query('SELECT * FROM sightings ORDER BY id')
  res.json(result.rows)
})

// GET /sightings/:id - return ONE sighting, looked up by its id.
// TODO 1: read the id from the route, fetch that one row with a parameterized
//         query, and send it back. If no such row exists, respond with the
//         "not found" status code instead. (Where does the id live on req?
//         Which property of the query result holds the first row?)
app.get('/sightings/:id', async (req, res) => {
  res.status(501).json({ error: 'TODO 1 not done' })
})

// POST /sightings - create a new sighting from the JSON body.
// TODO 2: insert a row from the body's four fields (location_id, ghost_type,
//         witnesses, reported_at) with a parameterized INSERT, then respond
//         with the created row and the status code that means "created".
//         (How do you get the new row back from an INSERT in one step?)
app.post('/sightings', async (req, res) => {
  res.status(501).json({ error: 'TODO 2 not done' })
})

// Start listening only when run directly (not when imported by smoke/flags).
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(3000, () => console.log('HAUnted Sightings API on http://localhost:3000'))
}
