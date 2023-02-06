#!/usr/bin/env bash
MAX_RETRY=120

WAIT_HARDHAT="true"
WAIT_SUBGRAPH="true"

while true; do
  case "$1" in
    -h|--help)
      echo "apps/davi/scripts/dev.sh"
      echo "This script will start davi app. By default will wait for hardhat node & subgraph to run react-app"
      echo ""
      echo "options:"
      echo "--no-browser: No browser window will pop up. Will run in background"
      echo "--no-subgraph-wait: Skip step to wait for local subgraph to be deployed"
      echo "--no-hardhat-wait: Skip step to wait for hardhat local node"
      exit 0
      ;;
    --no-browser*)
        echo "Setting BROWSER=none. No browser window will pop up"
        export BROWSER=none
        export BROWSER=none
        shift
      ;;
    --no-subgraph-wait*)
        echo "Skip subgraph waiting"
        WAIT_SUBGRAPH="false"
        shift
      ;;
    --no-hardhat-wait*)
        echo "Skip hardhat local node waiting"
        WAIT_HARDHAT="false"
        shift
      ;;
    *)
      break
      ;;
  esac
done

isHardhatRunning() {
    nc -z localhost 8545 2>&1
}
isSubgraphRunning(){
    status_code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao/graphql)
    if [[ $status_code -eq 200 ]]; then
        return 0
        break
    else
        return 1
    fi
}

waitForHardhat(){
    retry_count=0
    while ! isHardhatRunning; do
        if [ $retry_count -eq $MAX_RETRY ]; then
            echo "Hardhat Node is not ready after $MAX_RETRY retries. Exiting script"
            exit 1
        fi
        echo "Hardhat Node is not ready. Sleeping. ($retry_count / $MAX_RETRY)"
        sleep 1
        retry_count=$((retry_count+1))
    done
    echo "Hardhat Node is ready!"
}

waitForSubgraph(){
    retry_count=0
    while ! isSubgraphRunning; do
        if [ $retry_count -eq $MAX_RETRY ]; then
            echo "Subgraph Node is not ready after $MAX_RETRY retries. Exiting script"
            exit 1
        fi
        echo "Subgraph not ready. Sleeping. ($retry_count / $MAX_RETRY)"
        sleep 1
        retry_count=$((retry_count+1))
    done
    echo "Subgraph::: Local deployment ready!. Opening graphql playground in Browser"
}

if [ "$WAIT_HARDHAT" = "true" ]; then
    echo "waiting for hardhat"
    waitForHardhat
fi

if [ "$WAIT_SUBGRAPH" = "true" ]; then
    echo "waiting for subgraph"
    waitForSubgraph
    pnpm run build-graph-client
fi


# Run dapp with localhost contracts
export REACT_APP_GIT_SHA=$(echo $(git rev-parse  HEAD) | cut -c1-9)
export SKIP_PREFLIGHT_CHECK=true
export REACT_APP_VERSION=$npm_package_version


FORCE_COLOR=true GENERATE_SOURCEMAP=false react-app-rewired start | cat
