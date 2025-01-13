# Fitness Scheduler

A [Next.js](https://nextjs.org/) web application integrated with [Supabase](https://supabase.com/) and deployed using [Vercel](https://vercel.com/). 

Fitness Scheduler is a progressive web app designed to allow users to keep track of their various exercises and workouts as well as help motivate them to keep on top of them. Users can create their own exercises which can be sorted into their own custom workouts to then be able schedule them in the apps own personal calendar.

---

## Features

- **Authentication**: User authentication via Supabase, including email/password and social logins.
- **Database**: Supabase PostgreSQL database integration with powerful APIs.
- **Serverless Deployment**: Fully serverless with deployment on Vercel.
- **Next.js App Router**: Utilizes the App Router for modern routing capabilities.
- **Next.js Features**: Out-of-the-box features like API routes, SSR, and SSG.

---

## Requirements

- Node.js (version 16.x or newer)
- NPM or Yarn

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Wozza99/fitness-scheduler.git
cd fitness-scheduler
```

### 2. Install dependencies

Using NPM:

```bash
npm install
```

Or using Yarn:

```bash
yarn
```

### 3. Link Vercel project

```bash
npx vercel link
```

### 4. Pull environment variables

```bash
npx vercel env pull
```

You can find these values in the [Supabase Dashboard](https://app.supabase.com/).

### 5. Run the development server

Start the local development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Deployment

This application is hosted on [Vercel](https://vercel.com/), and deployments are automatically managed based on the branch:

- **Main Branch**: Deploys to the production environment.
- **Other Branches**: Deploy to preview environments.
- **Local Changes**: Use the development environment locally.

---

## Usage

### Authentication

The app comes with pre-built authentication powered by Supabase. You can customize the authentication UI by modifying the components in the `/components` directory.

### Database

Use the Supabase dashboard to manage your database schema. API routes can be created or updated in the `/app/api` directory to fetch or modify data.

