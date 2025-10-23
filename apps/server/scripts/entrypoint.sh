#!/bin/sh
set -e

echo "Executing database migrations..."
npm run schema:migrate

echo "Database migrations completed. Starting server..."

exec "$@"