if (-not $env:DATABASE_URL) {
    $env:DATABASE_URL = "postgres://postgres:postgres@localhost:5432/free_website"
}

psql $env:DATABASE_URL -f "db/migrations/001_create_rankings.sql"
node migrate.js
