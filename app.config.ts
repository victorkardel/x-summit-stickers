import { defineConfig } from '@tanstack/react-start/config'
import { cloudflare } from 'unenv'

export default defineConfig({
  server: {
    preset: 'cloudflare-module',
    unenv: cloudflare,
  },
})
