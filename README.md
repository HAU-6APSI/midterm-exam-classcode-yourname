# Midterm Practical Exam - Capture the Flags

This is your **midterm exam**. You are given a small, working backend app with a
database. Six pieces are left unfinished and marked `TODO`. Finish them, run one
command, and it prints a **flag** for each piece you got working - a code that
looks like `HAU{a1b2c3d4e5}`. **Paste each flag into the Canvas exam.** That is
your grade; you do not submit this repo.

A flag is built from what your program actually produces when it runs, so you
cannot guess it and you cannot read it out of the code - you have to make the
code work. If a TODO is not finished, the runner prints `LOCKED` instead of a
flag.

## Rules (read first)

- **Closed book. One hour. One sitting.** Open only: this repo, VS Code, and a
  terminal. **No AI assistants, no web search, no messaging.**
- Everything you need is in Modules 4 and 5 and in the hints inside the files.
- Your flags go in the **Canvas exam**, not here. Nobody grades this repo.

## Setup (about a minute)

You do not need to install PostgreSQL. The database runs in memory and rebuilds
the same rows every time, so the flags never change between runs.

```bash
npm install
```

## What you do

Open `app.js` and `queries.js` and finish the six `TODO`s. Each has a hint
directly above it.

- **app.js (Module 4 - the API):** TODO 1 finishes `GET /sightings/:id`
  (including a 404 when the id does not exist), TODO 2 finishes `POST /sightings`.
- **queries.js (Module 5 - the database):** TODO 3 to TODO 6 finish four
  reporting queries.

## Capture the flags

Run this whenever you want to check your progress and collect flags:

```bash
npm run flags
```

Every line is either a `HAU{...}` flag (paste it into Canvas) or `LOCKED`
(that TODO is not done yet). There are **10 flags** to capture:

| Flag | What it needs |
| --- | --- |
| flag_list | nothing - it works out of the box, a free flag |
| flag_one, flag_404 | TODO 1 |
| flag_create, flag_count9 | TODO 2 |
| flag_big | TODO 3 |
| flag_city | TODO 4 |
| flag_types | TODO 5 |
| flag_latest | TODO 6 |
| flag_master | every TODO solved |

Two more commands help you see what your code does while you work:

```bash
npm start        # runs the API at http://localhost:3000 (open /sightings)
npm run smoke    # fires every API request once and prints status + body
npm run queries  # runs the database queries and prints their rows
```

## The data

Two tables, fixed every run: **locations** (four haunted places) and
**sightings** (eight rows, each linked to a location by `location_id`). Do not
edit `db.js`. Good luck.
