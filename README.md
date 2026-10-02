# CampusIQ 360

A campus management REST API — attendance, assignments, timetables, courses and
events — built with Express 5 and MongoDB, with role-based access control.

![Node](https://img.shields.io/badge/node-18--20-green?logo=node.js)
![Express](https://img.shields.io/badge/express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose%209-47A248?logo=mongodb)



---

## Status

| Component | State |
|-----------|-------|
| API (`server/`) | In this repo, deployable |
| React client | **Not in this repo** — see [Missing client](#missing-client) |

---

## What it does

Nine resource domains, each with its own routes, controller and Mongoose model:

| Domain | Endpoint | Purpose |
|--------|----------|---------|
| Auth | `/api/auth` | Register, login, JWT issue (rate-limited) |
| Users | `/api/users` | Account management |
| Students | `/api/students` | Student records |
| Courses | `/api/courses` | Course catalogue |
| Subjects | `/api/subjects` | Subjects within courses |
| Attendance | `/api/attendance` | Attendance marking and history |
| Assignments | `/api/assignments` | Assignment lifecycle |
| Timetables | `/api/timetables` | Scheduling |
| Events | `/api/events` | Campus events |
| Dashboard | `/api/dashboard` | Aggregated summary data |

Health check: `GET /api/health`

### Security

- `helmet` for security headers
- Rate limiting on `/api/auth` — 20 requests per 15 minutes
- `bcryptjs` password hashing
- JWT authentication via `authMiddleware`, role checks via `roleMiddleware`
- CORS restricted to `FRONTEND_URL` when set

---

## Project structure

```
server/
├── server.js              # entrypoint — connects DB, binds 0.0.0.0:PORT
└── src/
    ├── app.js             # express app, middleware, route mounting
    ├── config/database.js # mongoose connection
    ├── models/            # 8 Mongoose schemas
    ├── controllers/       # 10 controllers
    ├── routes/            # 10 route modules
    └── middleware/        # auth, role, error handling
```

---

## Running locally

Requires Node 18–20 and a MongoDB instance (local or Atlas).

```bash
cd server
npm install
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm run dev              # nodemon, http://localhost:5000
```

Verify:

```bash
curl http://localhost:5000/api/health
# {"success":true,"message":"CampusIQ 360 API is running"}
```

> The server **exits** if it cannot reach MongoDB — it fails fast rather than
> starting in a broken state. If it quits on boot, check `MONGO_URI` first.

---

## Deploying the API to Render

The repo root holds no build tooling, so point Render at `server/`:

| Setting | Value |
|---------|-------|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

`render.yaml` encodes this — use **New → Blueprint** and Render reads it.
Creating the service manually instead means these must be set by hand, and
`render.yaml` is ignored.

Environment variables:

```
MONGO_URI      mongodb+srv://…        # Atlas connection string
JWT_SECRET     <32+ random chars>     # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_EXPIRE     7d
NODE_ENV       production
FRONTEND_URL   https://<client>.vercel.app
```

> **`FRONTEND_URL` is the CORS allowlist.** Without it the API allows every
> origin and logs a warning — fine locally, wrong in production. Additional
> origins can be added via `CORS_EXTRA_ORIGINS`, comma-separated.

Add Render's outbound IPs to the MongoDB Atlas IP allowlist, or allow
`0.0.0.0/0` for a demo deployment.

> Render's free tier sleeps after 15 minutes idle; the next request takes
> ~50 seconds to wake it.

---

## Missing client

The React frontend is **not committed to this repository**. The root previously
held a `client` entry recorded as a git submodule pointer (mode `160000`) to
commit `8a3d6b6`, with no `.gitmodules` file and no reachable object — a
dangling reference that cloned as an empty directory. It has been removed so
clones are not broken.

The client exists only on the author's machine and on its Vercel deployment.
To restore it, commit the source into `client/` as ordinary files:

```bash
# from the repo root, with the client source in ./client
rm -rf client/.git          # so it is committed as files, not a submodule
git add client
git commit -m "Add React client source"
```

Then deploy it as a separate Vercel project with root directory `client`,
pointing at the Render API via its own environment variable.

---

## License

No license file yet — all rights reserved by default. Add one if reuse is intended.
