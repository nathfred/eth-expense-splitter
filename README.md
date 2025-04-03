# ETH Expense Splitter by nathfred

🧪 Inspired by split bill feature. Now support multi expense per user feature.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: The frontend auto-adapts to we edit the smart contract.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build the frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test the application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Setup terminal directory

```
cd eth-expense-splitter
```

2. Install dependencies

```
yarn install
```

3. Navigate to hardhat directory

```
cd packages/hardhat
```

4. Start the Hardhat local hardhat blockchain

```
yarn hardhat node --network hardhat
```

5. Open other terminal and deploy the contract on local hardhat blockchain

```
yarn hardhat deploy --network hardhat
```

7. Navigate to nextjs directory

```
cd packages/nextjs
```

7. Start the frontend

```
yarn dev
```
