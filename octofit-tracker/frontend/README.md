# React + Vite

## OctoFit API environment

For Codespaces, `VITE_CODESPACE_NAME` must be defined in `octofit-tracker/frontend/.env.local`. Set it to the Codespace name only, without a protocol or domain:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Copy `.env.example` to `.env.local` and replace the placeholder. Vite then calls `https://<name>-8000.app.github.dev`. Restart the Vite server after changing environment variables.

When `VITE_CODESPACE_NAME` is unset, the frontend uses the localhost fallback `http://localhost:8000`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
