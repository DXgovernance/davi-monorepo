#!/usr/bin/env bash

# exit as soon as any command fails
set -e

# <<<<<---------- Constants ---------->>>>>
MAX_RETRY=120


# <<<<<---------- Utilities ---------->>>>>
# Start docker if not open
safeDockerStart(){
    retry_count=0
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        echo "safeDockerStart: Docker is not running. Starting Docker"

        # Open Docker from Mac os
        if [[ "$(uname -s)" == "Darwin" ]]; then
            echo "safeDockerStart: Starting docker from macos"
            open --background -a Docker

        # Open Docker from Linux
        elif [[ "$(uname -s)" == "Linux" ]]; then
            echo "safeDockerStart: Starting docker from linux"
            systemctl start docker
        fi
    fi

    while true; do
        if docker info > /dev/null 2>&1; then   
            echo "Docker is running. Proceeding with script"
            break
        else
            if [ $retry_count -eq $MAX_RETRY ]; then
                echo "Docker is not ready after $MAX_RETRY retries. Exiting script"
                exit 1
            fi
            echo "Waiting for Docker to start. Sleeping. Attempt $retry_count of $MAX_RETRY"
            sleep 1
            retry_count=$((retry_count+1))
        fi
    done

}

isHardhatRunning() {
  nc -z localhost 8545
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
}

waitForGraphContainer(){
    retry_count=0
    while true; do

        status=$(docker compose ps --filter "name=dxdao-subgraph-graph-node*" -q | xargs -I {} docker inspect --format '{{.State.Status}}' {})
        if [[ $status == *"running"* ]]; then
            echo "Graph node container is running"
            break
        else
            if [ $retry_count -eq $MAX_RETRY ]; then
                echo "Hardhat Node is not ready after $MAX_RETRY retries. Exiting script"
                exit 1
            fi
            echo "Waiting for graph-node to start ($retry_count / $MAX_RETRY)"
            sleep 1
            retry_count=$((retry_count+1))
        fi
    done
}

startGraphQlPlayground(){
    retry_count=0
    while true; do
        status_code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao/graphql)
        if [[ $status_code -eq 200 ]]; then
            echo "Subgraph::: Local deployment ready!. Opening graphql playground in Browser"
            if [[ "$(uname -s)" == "Darwin" ]]; then
                open http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao
            elif [[ "$(uname -s)" == "Linux" ]]; then
                xdg-open http://127.0.0.1:8000/subgraphs/name/mprasanjith/dxdao
            fi
            break
        else
            if [ $retry_count -eq $MAX_RETRY ]; then
                echo "Playground Error. Skipping auto open"
                break
            fi
            sleep 1
            retry_count=$((retry_count+1))
        fi
    done
}


# <<<<<---------- Start ---------->>>>>
echo "Subgraph::: Starting Docker"
safeDockerStart

echo "Subgraph::: Waiting for hardhat"
waitForHardhat

# Update bytecodes
echo "Subgraph::: Updating Bytecodes"
node ./scripts/updateBytecodes.js

echo "Subgraph::: Starting docker compose"
docker compose up &

waitForGraphContainer

echo "Subgraph::: Creating graph and deploying local"
pnpm run start-local &

startGraphQlPlayground