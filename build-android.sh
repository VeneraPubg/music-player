#!/usr/bin/env bash
set -e

echo "==> Сборка веба"
npm run build

if [ ! -d "dist" ]; then
  echo "ОШИБКА: папка dist не создалась"
  exit 1
fi

echo "==> Sync с Android"
npx cap sync android

echo "==> Открываю Android Studio"
npx cap open android
