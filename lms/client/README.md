# React + Vite

## Local and deployed API

Vite uses `.env.development` for `npm run dev` (the local backend at
`http://localhost:3000`) and `.env.production` for production builds (the
deployed backend at `https://learnhub-com.onrender.com`). Set `VITE_API_URL`
and `VITE_SOCKET_URL` as build environment variables on the frontend host if
you need to override these defaults.

On the backend host, set `FRONTEND_URL=https://learnhub-in.onrender.com`,
`API_BASE_URL=https://learnhub-com.onrender.com/api`, and
`GOOGLE_CALLBACK_URL=https://learnhub-com.onrender.com/api/auth/google/callback`.
Register the Google callback URL in the Google OAuth client configuration.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
