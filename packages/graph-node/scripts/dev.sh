#!/usr/bin/env bash

# exit as soon as any command fails
set -e

if ! which docker 2>&1 > /dev/null; then
    echo "Please install 'docker' first"
    exit 1
fi

cleanup() {
  echo "Graph-node::: Stopping docker compose"
  docker compose down
  exit 0
}

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

# <<<<<---------- Start ---------->>>>>

trap cleanup SIGINT

echo "Graph-node::: Starting Docker"
safeDockerStart

echo "Graph-node::: Waiting for hardhat"
waitForHardhat

echo "Graph-node::: Starting docker compose"
docker compose up --detach &

echo "Graph-node::: Watching docker logs"
wait
docker compose logs -f &