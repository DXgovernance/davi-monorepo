#!/usr/bin/env bash
node ./scripts/updateBytecodes.js
echo "Subgraph::: Waiting 30 seconds to dev-script to run"
sleep 30
echo "Subgraph::: Starting docker"
docker compose up &
echo "Subgraph::: waiting 60 seconds for docker"
sleep 60
echo "Subgraph::: Creating graph and deploying local"
pnpm run start-local