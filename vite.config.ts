import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

global.navigator = undefined

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: mode === "development" ? [react()] : [],
  esbuild: {
    jsxInject: `import * as React from 'react'`,
  },
}));
