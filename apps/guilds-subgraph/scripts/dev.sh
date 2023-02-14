#!/usr/bin/env bash

# exit as soon as any command fails
set -e

if ! which docker 2>&1 > /dev/null; then
    echo "Please install 'docker' first"
    exit 1
fi

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
    nc_output=$(nc -z localhost 8545 2>&1)
    last_word=$(echo "$nc_output" | rev | cut -d " " -f 1 | rev | xargs)
    if [ "$last_word" == "succeeded!" ]; then
       if [ -f "$PWD/../dev-scripts/build/deployment-info.json" ]; then
            echo "Hardhat is running"
            return 0
        else
            echo "Hardhat running but no deployment info found yet"
            return 1
        fi
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
}

waitForGraphContainer(){
    retry_count=0
    while true; do
        graph_container_status=$(docker ps --filter "name=guilds-subgraph-graph-node*" -q | xargs -I {} docker inspect --format '{{.State.Status}}' {})
        if [ "$graph_container_status" == "running" ]; then
            echo "Graph node container is running"
            sleep 10
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
        status_code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/subgraphs/name/dxdao/guilds/graphql)
        if [[ $status_code -eq 200 ]]; then
            echo "Subgraph::: Local deployment ready!. Opening graphql playground in Browser"
            if [[ "$(uname -s)" == "Darwin" ]]; then
                open http://127.0.0.1:8000/subgraphs/name/dxdao/guilds
            elif [[ "$(uname -s)" == "Linux" ]]; then
                xdg-open http://127.0.0.1:8000/subgraphs/name/dxdao/guilds
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

# Execute start-local script. If it fails will pause and try executing it 5 times.
tryStartLocal(){
    try_count=0

    while true; do
    pnpm run start-local && break

    try_count=$((try_count + 1))
    if [ $try_count -eq 5 ]; then
        echo "pnpm run start-local failed after 5 attempts. Exiting..."
        exit 1
    fi

    echo "Start Local script failed. Retrying in 10 seconds..."
    sleep 10
    done
}


# <<<<<---------- Start ---------->>>>>
echo "Subgraph::: Starting Docker"
safeDockerStart

echo "Subgraph::: Waiting for hardhat"
waitForHardhat

echo "Subgraph::: Starting docker compose"
docker compose up --detach &

echo "Subgraph::: Watching docker logs"
docker compose logs -f &

echo "Subgraph::: Waiting for graph node"
waitForGraphContainer

echo "Subgraph::: Creating graph and deploying local"
tryStartLocal &&

startGraphQlPlayground