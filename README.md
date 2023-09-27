## Tech Stack

- React (@18.2)
- Next js (@13.5)
- Tailwind CSS (@3.3.3)
- Solidity (@0.8.0)

## Setup Project: Local

First, download the git repository,

> **Stared (\*)** steps have replaceable configuration.

## Client side

```

git clone https://github.com/ToshaEX/Dapp-movie-tickets.git



# Client side setup

cd Dapp-movie-tickets/client

npm i



# Locate to constant/index.ts folder and replace with your Deployed address and Owner Wallet address(*)

# Locate to constant/MovieTicketing.json folder and replace all with MovieTicketing.json (in smart contract Artifact)



# Run application on development environment

npm run dev

```

## Smart Contract

```



# Smart contract setup

cd ../smart_contract

npm i



# Start local network & deploy smart contract

npx hardhat node

# Locate MovieTicketing.sol and change replace owner with your preference (*)

# Open new terminal and run bellow command, it return deployed address(*)

npx hardhat run scripts/deploy.ts --network localhost



# Locate to artifact folder and find MovieTicketing.json, then Copy whole file(*)



```
