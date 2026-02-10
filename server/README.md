# NodeJS Factory Server

Lightweight Node.js REST API for managing factory workforce data (employees, departments, shifts, and users).

## Features
- CRUD endpoints for employees, departments, and shifts
- User authentication and login
- Middleware for action logging, rate limiting, and authentication
- Layered structure: routers → services → repositories → models

## Architecture
Project follows a separation-of-concerns design with the following folders under `src/`:
- `routers/` — Express route handlers
- `services/` — Business logic
- `repositories/` — Data access (DB or external API)
- `models/` — Domain models
- `middleware/` — Auth, logging, and rate limiting
- `configs/` — Database configuration

## Requirements
- Node.js (v14+ recommended)

## Install
Run from the project root:

```bash
npm install
```

## Run
Start the server (example):

```bash
node src/index.js
```

If the project defines an `npm` start script, you can also run:

```bash
npm start
```

## Configuration
Database and environment configuration are located in `src/configs/db.js`.

## API (quick summary)
- `POST /login` — authenticate users
- `GET/POST/PUT/DELETE /employees` — manage employees
- `GET/POST/PUT/DELETE /departments` — manage departments
- `GET/POST/PUT/DELETE /shifts` — manage shifts
- `GET/POST/PUT/DELETE /users` — manage application users

## Logging
Action logs are written to `src/logs/actionLogs.json` by the actions logging middleware.

## Contributing
Open an issue or submit a pull request. Keep changes focused and include tests where appropriate.

## License
Add your license here.
