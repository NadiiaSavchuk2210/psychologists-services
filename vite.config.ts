import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const hasPackage = (id: string, packages: string[]) =>
  packages.some(pkg => id.includes(`/node_modules/${pkg}/`));

const getManualChunk = (id: string) => {
  if (!id.includes('/node_modules/')) {
    return undefined;
  }

  if (hasPackage(id, ['firebase', '@firebase'])) {
    return 'firebase-vendor';
  }

  if (
    hasPackage(id, [
      'react-router',
      'react-router-dom',
      '@remix-run/router',
    ])
  ) {
    return 'router-vendor';
  }

  if (
    hasPackage(id, [
      'react-hook-form',
      '@hookform/resolvers',
      'yup',
      'react-number-format',
    ])
  ) {
    return 'form-vendor';
  }

  if (
    hasPackage(id, [
      'i18next',
      'react-i18next',
      'i18next-browser-languagedetector',
      'i18next-http-backend',
    ])
  ) {
    return 'i18n-vendor';
  }

  if (hasPackage(id, ['@tanstack/react-query', '@tanstack/react-query-devtools'])) {
    return 'query-vendor';
  }

  if (
    hasPackage(id, [
      'framer-motion',
      'motion-dom',
      'motion-utils',
      'react-hot-toast',
      'react-spinners',
      'usehooks-ts',
      'zustand',
      'axios',
      'clsx',
    ])
  ) {
    return 'ui-vendor';
  }

  if (
    hasPackage(id, [
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-icons',
      '@radix-ui/react-select',
      '@radix-ui/react-toggle-group',
    ])
  ) {
    return 'radix-vendor';
  }

  return 'vendor';
};

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: getManualChunk,
      },
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
