# ETH Expense Splitter

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Foundry/Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

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

4. Navigate to hardhat directory

```
cd packages/hardhat
```

5. Init hardhat

```
cd packages/hardhat
```

6. Deploy contract

```
yarn hardhat run scripts/deploy.ts --network localhost
```

7. Navigate to nextjs directory

```
cd packages/nextjs
```

7. Navigate to nextjs directory

```
cd packages/nextjs
```

8. Start the Hardhat local blockchain

```
yarn hardhat node
```

9. Deploy contract

```
yarn hardhat run scripts/deploy.ts --network localhost
```

10. Start frontend

```
yarn dev
```
