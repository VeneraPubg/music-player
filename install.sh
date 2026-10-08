#!/usr/bin/env bash
set -e

# Capacitor core (если ещё не создан проект)
npm install @capacitor/core @capacitor/cli @capacitor/android

# Плагины
npm install @capawesome/capacitor-file-picker
npm install capacitor-plugin-playlist
npm install @capacitor/preferences
npm install @capacitor/splash-screen @capacitor/status-bar

# Синхронизация с Android
npx cap sync android
