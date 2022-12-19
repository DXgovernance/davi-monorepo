# DAVI Monorepo

### Prerequisites

1. `pnpm` (`npm` and `yarn` are **not supported**.)

### How to setup

1. Clone this repo.
2. Clone DAVI into apps/davi-frontend: `git clone -b feature/monorepo-setup https://github.com/DXgovernance/DAVI apps/davi-frontend`
3. Clone dxdao-contracts into apps/dxdao-contracts `git clone -b feature/monorepo-setup https://github.com/DXgovernance/dxdao-contracts apps/dxdao-contracts`
4. Clone subgraph into apps/dxdao-subgraph `git clone -b feature/monorepo-setup https://github.com/DXgovernance/dxdao-subgraph apps/dxdao-subgraph`
3. Install dependencies `pnpm i`


### Common Issues and Solutions

1. `pnpm i` fails with `node-gyp` errors

You might not have the relavant build tools for node-gyp to run. Check this if you're on [Mac OS](https://github.com/nodejs/node-gyp/blob/HEAD/macOS_Catalina.md#The-acid-test).