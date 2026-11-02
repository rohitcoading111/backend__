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

The backend sends all application email through the Gmail API. Keep these
credentials only in `lms/server/.env` locally and in the backend host's private
environment settings in production. Never use frontend or `VITE_` variables.

```env
EMAIL_PROVIDER=gmail-api
GMAIL_API_CLIENT_ID=<LearnHub Gmail Sender OAuth client ID>
GMAIL_API_CLIENT_SECRET=<LearnHub Gmail Sender OAuth client secret>
GMAIL_API_REFRESH_TOKEN=<generated refresh token>
GMAIL_API_REDIRECT_URI=http://localhost:3001/oauth2callback
GMAIL_SENDER_EMAIL=rp538220@gmail.com
GMAIL_SENDER_NAME=LearnHub
```

Use the separate **LearnHub Gmail Sender** OAuth client for these values. Do
not reuse the OAuth client used for LMS Google Login. To create the refresh
token, configure the client ID and secret locally, then run
`npm run generate:gmail-token` from `lms/server` and complete consent in the
browser. Save the one-time output only in private environment settings.
`GMAIL_API_REDIRECT_URI` is used by this local script; the sending service uses
the already-issued refresh token.

For Render, set `NODE_ENV=production`, `EMAIL_PROVIDER=gmail-api`, and the
client ID, client secret, refresh token, sender email, and sender name as
private backend environment variables. The redirect URI is not needed at
runtime.

Google's External OAuth consent app in **Testing** mode issues refresh tokens
for sensitive Gmail scopes that expire after seven days. This is not a
permanent production configuration. Set the OAuth audience to **In production**
and complete Google's verification for the sensitive `gmail.send` scope before
relying on it long term. Configure the consent screen's app name, support and
developer contact information, authorized domains, homepage, and privacy policy;
submit the requested scope justification and demo evidence in the verification
process. Follow any additional security assessment requirement Google displays
for the final scope classification. Never bypass consent or verification.
Gmail API acceptance confirms the API accepted the message, not inbox delivery;
check the recipient inbox and Gmail delivery/bounce signals separately.

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
