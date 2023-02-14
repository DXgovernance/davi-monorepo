# DXdao Subgraph

> Subgraph implementation for DXdao contracts.

For more information see the docs on https://thegraph.com/docs/.

## How to build

You need to have `docker` and `docker-compose` installed

After cloning the repo:

```sh

yarn install

yarn codegen # Should run automatically on yarn install as well

yarn build

```

### Linux setup

```
sudo ./setup-linux.sh
```

## How to deploy

1. Follow the build steps above.

2. Set up the front-end repo and run it in the background

3. Run docker

```sh
sudo docker compose up
```

4.

```sh
# For local deployments
yarn create-local
yarn deploy-local
```

```sh
# For graph Hosted Service

# 1. Create the subgraph on the Graph Dashboard: https://thegraph.com/hosted-service/dashboard

# 2. Authenticate with the hosted service API.
graph auth --product hosted-service <api-key>

# 3. Deploy the subgraph
yarn deploy
```

