# Connect Wallet

A lightweight Next.js wallet connection UI that showcases a modern sign-in flow for connecting a crypto wallet. The app presents a polished modal-based experience with wallet options, email continuation, and an animated multi-step dialog inspired by wallet onboarding screens.

## What this project includes

- Wallet connection modal UI
- Multi-step dialog flow
- Email entry and validation
- Wallet provider choices such as MetaMask, Argent, Coinbase, and other wallets
- Animated transitions using Framer Motion
- Accessible dialog patterns with Radix UI primitives
- Responsive styling with Tailwind CSS

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Framer Motion
- Jest + React Testing Library

## Getting started

Install dependencies:

```bash
yarn install
```

Run the app locally:

```bash
yarn dev
```

Open http://localhost:3000 to view it in the browser.

## Running tests

```bash
yarn test
```

## Project purpose

This app is designed as a front-end prototype for a wallet connect experience. It focuses on UI flow, transitions, and user interaction patterns rather than backend blockchain integration.

## Notes

The main entry point is the wallet dialog experience rendered from the app page. The component structure is organized around step-based state transitions and reusable UI blocks for wallet options and authentication flows.
