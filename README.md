<img src="https://capsule-render.vercel.app/api?type=waving&color=0:54BE96,50:3470FF,100:FC832C&height=220&section=header&text=Psychologists%20Services&fontSize=42&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Responsive%20mental%20health%20platform%20built%20with%20React%2C%20TypeScript%2C%20Vite%2C%20and%20Firebase&descAlignY=60&descSize=16" alt="Psychologists Services header" />

<div align="center">

<img src="public/apple-touch-icon.png" alt="Psychologists Services logo" width="96" height="96" />

# Psychologists Services

A web app for browsing psychologists, saving favorites, and booking appointments.

<p>
  <img src="https://img.shields.io/badge/status-active-54BE96?style=flat-square" alt="Project status: active" />
  <img src="https://img.shields.io/badge/platform-web-3470FF?style=flat-square" alt="Platform: web" />
  <img src="https://img.shields.io/badge/locales-en%20%7C%20uk-FC832C?style=flat-square" alt="Locales: English and Ukrainian" />
</p>

<p>
  <a href="https://psychologists-services-orpin.vercel.app/"><strong>Live Demo</strong></a>
  ·
  <a href="https://github.com/NadiiaSavchuk2210/psychologists-services"><strong>Source Code</strong></a>
  ·
  <a href="https://www.figma.com/design/I5vjNb0NsJOpQRnRpMloSY/Psychologists.Services?m=auto&t=MPhtRiTVSHH0Bl64-6"><strong>Figma</strong></a>
</p>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)](https://www.i18next.com/)

<p>
  <img src="https://skillicons.dev/icons?i=react,ts,vite,firebase,css,github,figma&perline=7" alt="Tech stack icons" />
</p>

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Preview](#-preview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Routes](#-routes)
- [Data and Firebase](#-data-and-firebase)
- [Installation and Setup](#-installation-and-setup)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Author](#-author)

## 🌿 Overview

**Psychologists Services** is a responsive single-page application for a psychology services platform. Users can browse a catalog of psychologists, sort specialists, save favorites after authentication, and send an appointment request through a modal form.

The project is built with `React 19` and `Vite`, uses `Firebase Authentication`, `Realtime Database`, and `Firestore`, and supports both English and Ukrainian localization.

> Built as a clean, modern SPA with protected routes, persisted UI state, and a Firebase-backed user flow.

## 🖼 Preview

<div align="center">
  <img src="public/psychologists-services-og.png" alt="Psychologists Services preview" width="100%" />
</div>

## ✨ Features

| Area | Details |
| --- | --- |
| Catalog | `/psychologists` page with loading in batches of `3` items |
| Filters | Sorting psychologists by supported options |
| Cards | Expandable cards with profile details and reviews |
| Appointments | Modal booking form with validation and Firestore submission |
| Authentication | Sign up, sign in, sign out, and protected favorites route |
| Favorites | Add and remove psychologists from a personal saved list |
| Persistence | Form drafts saved with `zustand/persist` |
| Localization | Language switcher for `en` and `uk` |
| Theme | Persisted color theme selection |
| UX | Responsive layout, toasts, lazy loading, and smooth interactions |

## 🛠 Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | `React 19`, `TypeScript`, `Vite` |
| Routing | `React Router 7` |
| Data Fetching | `TanStack Query` |
| Backend Services | `Firebase Authentication`, `Realtime Database`, `Firestore` |
| Forms and Validation | `React Hook Form`, `Yup` |
| State | `Zustand` |
| UI and Motion | `Radix UI`, `Framer Motion`, `CSS Modules` |
| Localization | `i18next` |

<div align="center">
  <img src="https://img.shields.io/badge/Architecture-SPA-54BE96?style=for-the-badge" alt="SPA architecture" />
  <img src="https://img.shields.io/badge/Auth-Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase auth" />
  <img src="https://img.shields.io/badge/State-Zustand-3470FF?style=for-the-badge" alt="Zustand state" />
  <img src="https://img.shields.io/badge/Forms-React_Hook_Form-FC832C?style=for-the-badge" alt="React Hook Form" />
</div>

## 📁 Project Structure

```text
psychologists-services/
├── public/                    # locales, manifest, icons, preview image
├── src/
│   ├── app/                   # app bootstrap, routing, providers
│   ├── assets/                # images
│   ├── entities/              # domain entities
│   ├── features/              # auth, favorites, appointment, sorting, theme
│   ├── pages/                 # route-level pages
│   ├── shared/                # shared UI, hooks, utils, config, store
│   ├── styles/                # global styles and tokens
│   └── widgets/               # composed page sections
├── .env.example
├── package.json
└── vite.config.ts
```

## 🧭 Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/psychologists` | Psychologists catalog |
| `/favorites` | Favorite psychologists page for authenticated users only |

## 🔥 Data and Firebase

The project uses two Firebase data sources:

- `Realtime Database` for the psychologists catalog
- `Firestore` for user-specific data, including `favorites` and `appointments`

`Firebase Authentication` handles registration, login, logout, and current user session state.

## 🚀 Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/NadiiaSavchuk2210/psychologists-services.git
cd psychologists-services
```

2. Install dependencies:

```bash
npm install
```

3. Create a local `.env` file based on `.env.example`

4. Fill in the environment variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_PUBLIC_APP_URL=http://localhost:5173
```

5. Start the development server:

```bash
npm run dev
```

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates a production build with `tsc -b && vite build` |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Previews the production build locally |

## 🌐 Deployment

The production version is deployed on Vercel:

- https://psychologists-services-orpin.vercel.app/

## 👩‍💻 Author

**Nadiia Savchuk**

- GitHub: [@NadiiaSavchuk2210](https://github.com/NadiiaSavchuk2210)
- Project Repository: [psychologists-services](https://github.com/NadiiaSavchuk2210/psychologists-services)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:FC832C,50:3470FF,100:54BE96&height=120&section=footer" alt="Footer decoration" />
</p>
