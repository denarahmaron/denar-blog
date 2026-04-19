#!/bin/sh
echo "Running database migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
  echo "Migration completed successfully"
else
  echo "Migration failed, but continuing anyway..."
fi

echo "Running database seed..."
npx tsx prisma/seed.ts

echo "Starting application..."
exec node server.js