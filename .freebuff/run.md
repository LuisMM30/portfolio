## Reproduce required artifacts

- Use the repository's package manager and lockfile: run `npm install` from the project root.
- If a future checkout contains a `.env.local` in the main checkout, copy it into this worktree before starting the app; never commit secrets. This project currently has no required local environment file.

## Run the preview server

- Start the Vite development server with `npm run dev`.
- Use the default Vite port `5173` when it is available; otherwise pass an available port with `npm run dev -- --port <port>`.
- For this Windows worktree, launch the detached process with the PowerShell `Start-Process` recipe supplied by Freebuff, redirecting stdout and stderr to separate log files.
