# ETH Expense Splitter by nathfred

Project Overview:
Expense Splitter is a decentralized application (dApp) built on top of Scaffold-ETH 2, designed to simplify group expense management using blockchain technology. Inspired by popular bill-splitting apps, this dApp allows multiple users to collaboratively track and split shared expenses in a transparent and trustless manner. Unlike traditional apps, Expense Splitter leverages smart contracts to ensure fairness and immutability of records. Users can log multiple expenses, view their individual share, and settle balances—all executed on-chain.

Key Features:
Group Expense Tracking: Users can create expense groups and add multiple expenses per group.
Multi-Expense Support per User: Each user can contribute or owe across multiple transactions within a group.
Fair Split Calculations: The dApp automatically calculates the owed amounts based on the proportion of each participant's contributions.
On-chain Settlement: Users can settle balances using ETH, ensuring transparent and verifiable payments.
Scaffold-ETH 2 Powered UI: Built with Scaffold-ETH 2 for rapid prototyping, providing a smooth Web3 UX with wallet integrations.
Responsive and Intuitive Frontend: Clear interface showing expense lists, user balances, and pending settlements.

Tech Stack:
Frontend: React, Tailwind CSS (via Scaffold-ETH 2)
Smart Contracts: Solidity (Expense Splitter contract)
Web3 Library: wagmi, ethers.js
State Management: viem + wagmi hooks
Deployment: Vercel / Netlify / Localhost Dev Environment

Use Cases:
Splitting dinner bills or group trips among friends.
Transparent group expense management for events or communities.

Educational demo for on-chain accounting and financial dApps.\
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
