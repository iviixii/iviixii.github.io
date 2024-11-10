/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  ssr: {
    noExternal: [
      '@spartan-ng/**',
      '@angular/cdk/**',
      '@ng-icons/**',
    ]
  },
  plugins: [
    analog({
      content: {
        highlighter: 'prism',
      },
      prerender: {
        routes: ['/blog', '/blog/2022-12-27-my-first-post'],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
