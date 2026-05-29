# Bamenda Delivery API

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Use SQLite for local development:

```env
DB_CONNECTION=sqlite
# DB_DATABASE is absolute path or database/database.sqlite
```

Or configure MySQL and create the `delivery` database.

```bash
touch database/database.sqlite   # if using SQLite
php artisan migrate
php artisan db:seed
```

## Default admin (after seeding)

| Field    | Value              |
|----------|--------------------|
| Email    | `admin@bamenda.cm` |
| Password | `password123`      |

## Run API server

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

## Admin API (`/api/admin`)

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/admin/login` | No |
| GET | `/api/admin/me` | Bearer token |
| POST | `/api/admin/logout` | Bearer token |
| GET | `/api/admin/agents` | Bearer token |
| POST | `/api/admin/agents` | Bearer token |
| GET | `/api/admin/agents/{id}` | Bearer token |
| PUT | `/api/admin/agents/{id}` | Bearer token |
| DELETE | `/api/admin/agents/{id}` | Bearer token |

### Create agent body

```json
{
  "name": "Jude Courier",
  "phone": "+237671111111",
  "pin": "1234",
  "base_zone": "Nkwen",
  "vehicle_plate": "NW 1234 A"
}
```

## Tests

```bash
php artisan test --filter=Admin
```
