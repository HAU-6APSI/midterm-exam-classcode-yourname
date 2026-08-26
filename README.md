# Midterm Practical Exam - HAUnted Sightings

This is your **midterm exam**. It is a small, working backend project with a
database. Six pieces are left unfinished and marked `TODO`. Finish them, run the
program, and then answer the **Canvas quiz** using what your own program shows
you. The Canvas quiz is your grade; you do not submit this repo.

## Rules (read first)

- **Closed book. One hour. One sitting.** Open only: this repo, VS Code, and a
  terminal. **No AI assistants, no web search, no messaging.**
- Everything you need is in Modules 4 and 5 and in the hints inside the files.
- Your answers go in the **Canvas quiz**, not here. Nobody grades this repo.

## Setup (about a minute)

You do not need to install PostgreSQL. The database runs in memory and rebuilds
the same rows every time, so the answers never change between runs.

```bash
npm install
```

## What you do

Open `app.js` and `queries.js`. Find the six `TODO` comments and complete them.
Each has a hint directly above it.

- **app.js (Module 4 - the API):** TODO 1 finishes `GET /sightings/:id`,
  TODO 2 finishes `POST /sightings`.
- **queries.js (Module 5 - the database):** TODO 3 to TODO 6 finish four
  reporting queries.

## How to see the answers

Three commands, each prints what you need:

```bash
npm start        # runs the API at http://localhost:3000 (open /sightings)
npm run smoke    # fires every API request once and prints status + body
npm run queries  # runs the database queries and prints their rows
```

If a value looks wrong, your TODO is not finished yet - fix it and run again.

## The data

Two tables, fixed every run:

- **locations** - four haunted places (Manila Film Center, Diplomat Hotel in
  Baguio, Balete Drive, Clark Air Base).
- **sightings** - eight rows, each with a `ghost_type`, a `witnesses` count, a
  `reported_at` date, and a `location_id` linking it to a location.

Do not edit `db.js`. Good luck.
