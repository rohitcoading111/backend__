# React + Vite

## Local and deployed API

Vite uses `.env.development` for `npm run dev` and `.env.production` for
production builds. Both default to the deployed backend at
`https://learnhub-com.onrender.com`, so the local frontend can use the live
backend. To run the local backend instead, create `.env.development.local`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Set `VITE_API_URL` and `VITE_SOCKET_URL` as build environment variables on the
frontend host if you need to override these defaults.

On the backend host, set `FRONTEND_URL=https://learnhub-in.onrender.com`,
`API_BASE_URL=https://learnhub-com.onrender.com/api`, and
`GOOGLE_CALLBACK_URL=https://learnhub-com.onrender.com/api/auth/google/callback`.
Register the Google callback URL in the Google OAuth client configuration.
Google sign-in redirects to the frontend URL configured in the backend's
`FRONTEND_URL` setting.

## Backend email provider

Email provider settings belong only in the **backend** environment; never put
Mailjet credentials in frontend or `VITE_` variables.

For local backend development, set `NODE_ENV=development` and
`MAIL_PROVIDER=gmail`, and keep `EMAIL_USER` and `EMAIL_APP_PASSWORD` in the
backend's ignored `.env` file.

For the Render backend, set `NODE_ENV=production` and these backend environment
variables:

```env
MAIL_PROVIDER=mailjet
MAILJET_API_KEY=<Mailjet API key>
MAILJET_SECRET_KEY=<Mailjet secret key>
MAILJET_SENDER_EMAIL=<verified Mailjet sender address>
MAILJET_SENDER_NAME=LearnHub
```

Mailjet acceptance means the Send API accepted the request; it does not prove
delivery to the recipient. Check Mailjet's message activity/status for delivery
or bounce confirmation.

For local frontend development against the live backend, set
`VITE_API_URL=https://learnhub-com.onrender.com/api` and
`VITE_SOCKET_URL=https://learnhub-com.onrender.com` in the development
environment.

For React Router deep links on Render, add a static-site rewrite in the
frontend service's **Redirects/Rewrites** settings:

- Source: `/*`
- Destination: `/index.html`
- Action: **Rewrite**

Without this rule, routes such as `/login` and `/auth/google/callback` return
404 when opened directly or when Google redirects back to the frontend.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
