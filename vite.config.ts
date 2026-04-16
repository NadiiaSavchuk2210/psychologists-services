import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const hasPackage = (id: string, packages: string[]) =>
  packages.some(pkg => id.includes(`/node_modules/${pkg}/`));

const hasModulePath = (id: string, modules: string[]) =>
  modules.some(modulePath => id.includes(`/node_modules/${modulePath}/`));

const getFirebaseChunk = (id: string) => {
  if (!hasPackage(id, ['firebase', '@firebase'])) {
    return undefined;
  }

  if (
    hasModulePath(id, [
      'firebase/auth',
      '@firebase/auth',
      '@firebase/auth-interop-types',
    ])
  ) {
    return 'firebase-auth';
  }

  if (
    hasModulePath(id, [
      'firebase/firestore',
      '@firebase/firestore',
      '@firebase/webchannel-wrapper',
    ])
  ) {
    return 'firebase-firestore';
  }

  if (hasModulePath(id, ['firebase/database', '@firebase/database'])) {
    return 'firebase-database';
  }

  return 'firebase-core';
};

const getManualChunk = (id: string) => {
  if (!id.includes('/node_modules/')) {
    return undefined;
  }

  const firebaseChunk = getFirebaseChunk(id);

  if (firebaseChunk) {
    return firebaseChunk;
  }

  if (
    hasPackage(id, ['react-router', 'react-router-dom', '@remix-run/router'])
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
    ])
  ) {
    return 'i18n-vendor';
  }

  if (
    hasPackage(id, ['@tanstack/react-query', '@tanstack/react-query-devtools'])
  ) {
    return 'query-vendor';
  }

  if (
    hasPackage(id, [
      'zustand',
      'clsx',
    ])
  ) {
    return 'ui-core-vendor';
  }

  if (hasPackage(id, ['usehooks-ts'])) {
    return 'hooks-vendor';
  }

  if (hasPackage(id, ['axios'])) {
    return 'http-vendor';
  }

  if (
    hasPackage(id, [
      'framer-motion',
      'motion-dom',
      'motion-utils',
      'react-hot-toast',
    ])
  ) {
    return 'feedback-vendor';
  }

  if (
    hasPackage(id, [
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-icons',
      '@radix-ui/react-select',
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
