#!/usr/bin/env bash

# exit as soon as any command fails
set -e

# <<<<<---------- Constants ---------->>>>>
MAX_RETRY=120


# <<<<<---------- Utilities ---------->>>>>

waitForGraphContainer(){
    retry_count=0
    while true; do
        graph_container_status=$(docker ps --filter "name=local-graph-node*" -q | xargs -I {} docker inspect --format '{{.State.Status}}' {})
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
    if [ $try_count -eq 10 ]; then
        echo "pnpm run start-local failed after 10 attempts. Exiting..."
        exit 1
    fi

    echo "Start Local script failed. Retrying in 10 seconds..."
    sleep 10
    done
}


# <<<<<---------- Start ---------->>>>>


echo "Subgraph::: Waiting for graph node"
waitForGraphContainer

echo "Subgraph::: Creating graph and deploying local"
tryStartLocal &&

startGraphQlPlayground