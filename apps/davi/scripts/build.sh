#!/usr/bin/env bash
echo "Executing beforeBuild"
node scripts/beforeBuild.js


# Add in once we upgrade to support ordered environment variables
# export REACT_APP_GIT_SHA=$(echo $(git rev-parse  HEAD) | cut -c1-9)
export REACT_APP_VERSION=$npm_package_version
export SKIP_PREFLIGHT_CHECK=true

pnpm run build-graph-client
pnpm react-app-rewired --max_old_space_size=4096 build
