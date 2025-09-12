// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://nuki-ve.github.io',
  base: '/cv-generator',
  integrations: [react()]
})
