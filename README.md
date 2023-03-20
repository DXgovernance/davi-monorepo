# DAVI Monorepo

## Prerequisites

1. `pnpm` v7.18.2(`npm` and `yarn` are **not supported**.)
   https://pnpm.io/installation

2. `docker` & `docker-compose`

## How to setup

1. Create a fork of this repo.
2. Clone your fork installing submodules `git clone --recurse-submodules [your-github-fork-url.git]`. If you clone this repo without `--recurse-submodules` be sure to go to `packages/dxdao-contracts` and clone necesary branch pointed in `./.gitmodules` file.
3. Install dependencies `pnpm i`
4. Make an `.env` file in the `./packages/dev-scripts` folder (see `.env.example`) and write a seed phrase and deploy salt for hardhat.
5. Make an `.env` file in the `./apps/davi` folder (see `.env.example`).

## Development

To run project locally you need to compile contracts, run hardhat node from dev-scripts, run docker graph-node container, create/deploy local subgraphs and run davi-frontend. Currently`pnpm dev` from root project won't work. To do so, you need to run 4 different processes:

1. Run hardhat node locally: `pnpm run dev-scripts:dev`
2. Start docker containers: `pnpm run graph-node:dev` (Will require hardhat to be running and docker to be installed and open)
3. Point `deployedHashedBytecodesJSON` to local in `./apps/guilds-subgraph/src/mappings/Create2Deployer/mapping.ts#L13` (const deployedHashedBytecodesJSON = local)
4. Create and deploy local subgraphs (1.5 & guilds): `pnpm run subgraph:dev` (graph-node container should be running. Verify before execute start-local).
5. After both subgraphs are deployed locally, build DAVI graph-client & run dApp with: `pnpm run davi:dev`. If you don't want to wait for hardhat node and subgraphs do `davi:dev-no-wait`

### If you're on Linux:

First, do the steps above.

1. Run a hardhat instance

```
cd apps/dev-scripts

pnpm dev
```

2. In another terminal, run the Linux subgraph setup

```
cd apps/dxdao-subgraph

sudo ./setup-linux.sh
```

3. When it finishes, terminate the hardhat instance

## Common Issues and Solutions

#### 1. `pnpm i` fails with `node-gyp` errors

You might not have the relavant build tools for node-gyp to run. Check this if you're on [Mac OS](https://github.com/nodejs/node-gyp/blob/HEAD/macOS_Catalina.md#The-acid-test).

#### 2. `listen tcp4 0.0.0.0:5432: bind: address already in use`

There's a process already running on port 5432 (usually postgres).

Run

```
sudo lsof -i :5432
```

to get the PID of the process, and

```
sudo kill -9 [PID]
```

to terminate it.

### 3. If you're on Linux and get this error

```
dxdao-subgraph:dev: ✖ Failed to deploy to Graph node http://127.0.0.1:8020/: subgraph validation error: [the specified block must exist on the Ethereum network]
dxdao-subgraph:dev: error Command failed with exit code 1.
dxdao-subgraph:dev: info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
dxdao-subgraph:dev:  ELIFECYCLE  Command failed with exit code 1.
dxdao-subgraph:dev:  ELIFECYCLE  Command failed with exit code 1.
```

Then there was a problem during the Linux setup. Common sources of this are

1. The subgraph was already running during the setup: make sure there are no instances of the subraph running. Run `docker compose down`
2. The hardhat instance wasn't running while doing the setup: make sure the hardhat instance is running, and only then run the linux setup.

#### 4. Dev script permissions

If you see `permission denied: ./packages/graph-node/scripts/dev.sh` you might need to set permissions for dev script.

```
chmod +x ./packages/graph-node/scripts/dev.sh
```

# DAVI Monorepo QA tests

## Prerequisites

1. Navigate to `apps/davi`
2. Run `pnpm i`
3. Make an `.env` file in the `davi` folder (see `.env.qa.example`) - file contains all parameters for `localhost` and `metamask` setups

### How to run test

To run Smoke test in terminal run:

`pnpm test:[testName]`

All available `[testName]` can be found in:

`apps > davi > cypress > config`

Currently there are:

1. `smokeLocal` - starts localhost:3000 and runs Smoke test on local
2. `smokeQa` - runs Smoke test on QA ENV
3. `smokeProd` - runs Smoke test on PROD ENV
4. `regressionLocal` - starts localhost:3000 and runs Regression test on local
