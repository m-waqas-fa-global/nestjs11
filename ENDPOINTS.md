# API Endpoints

| Method | Path | Controller | Handler |
|---|---|---|---|
| GET | `/` | `AppController` | `getHello` |
| POST | `/api/reports/create` | `ReportsController` | `create` |
| GET | `/api/reports/getAll` | `ReportsController` | `findAll` |
| GET | `/api/reports/search` | `ReportsController` | `search` |
| GET | `/api/reports/:id` | `ReportsController` | `findOne` |
| PATCH | `/api/reports/:id` | `ReportsController` | `update` |
| DELETE | `/api/reports/:id` | `ReportsController` | `remove` |
| GET | `/api/reports/getAPILogs` | `ReportsController` | `healthCheck` |
| POST | `/file-server` | `FileServerController` | `create` |
| GET | `/file-server/read-file` | `FileServerController` | `findAll` |

## Notes
- `ReportsController` has `@Controller()` and is prefixed by `RouterModule.register(...)` at `/api/reports`.
- Commented routes are excluded.
