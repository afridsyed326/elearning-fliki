# Elearning Fliki Monorepo

This is a monorepo for the Elearning Fliki project, containing both backend and frontend applications, as well as shared libraries. The project uses [Nx](https://nx.dev/) for monorepo management, [Next.js](https://nextjs.org/) for the frontend, [Express](https://expressjs.com/) for the backend API, and [tRPC](https://trpc.io/) for type-safe API communication.

## Project Structure

```
.
├── apps/
│   ├── api/           # Express + tRPC backend
│   └── web/           # Next.js frontend
├── libs/
│   ├── db/            # Shared database logic/types
│   ├── trpc-client/   # tRPC client setup
│   └── trpc-server/   # tRPC server setup and routers
├── .husky/            # Git hooks
├── nx.json            # Nx configuration
├── package.json       # Root dependencies and scripts
├── pnpm-workspace.yaml
├── tsconfig.json
└── ...
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended for workspace support)

### Install Dependencies

From the root directory, run:

```sh
pnpm install
```

### Start the Applications

#### 1. Start the Backend API

```sh
pnpm --filter api dev
```

This will start the Express/tRPC backend (by default on port 4000).

#### 2. Start the Frontend Web App

In a new terminal, run:

```sh
pnpm --filter web dev
```

This will start the Next.js frontend (by default on [http://localhost:3000](http://localhost:3000)).

### Development Workflow

- Edit frontend code in [`apps/web`](apps/web/).
- Edit backend code in [`apps/api`](apps/api/).
- Shared logic and types can be placed in [`libs/`](libs/).

### Linting and Formatting

Run linting across the workspace:

```sh
pnpm lint
```