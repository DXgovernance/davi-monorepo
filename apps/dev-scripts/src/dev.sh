#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

# Executes cleanup function at script exit.
trap cleanup EXIT

cleanup() {
  # Kill the hardhat instance that we started (if we started one and if it's still running).
  if [ -n "$hardhat_pid" ] && ps -p $hardhat_pid > /dev/null; then
    kill -9 $hardhat_pid
  fi
}

hardhat_running() {
  nc -z localhost 8545
}

start_hardhat_node() {
  pnpm hardhat node --hostname 0.0.0.0

  hardhat_pid=$!

  echo "Waiting for hardhat to launch..."

  while ! hardhat_running; do
    sleep 0.1 # wait for 1/10 of the second before check again
  done

  echo "Harhat node launched!"
}

if hardhat_running; then
  echo "Killing existent hardhat"
  kill $(lsof -t -i:8545) 
fi

echo "Starting our own hardhat node instance"
start_hardhat_node