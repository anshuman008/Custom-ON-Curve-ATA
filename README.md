# Custom Off-Curve ATA (Associated Token Account)

A Solana TypeScript project demonstrating the creation and management of custom off-curve Associated Token Accounts (ATAs) alongside traditional deterministic ATAs.

## Overview

This project showcases two different approaches to creating token accounts on Solana, born from a real-world discovery of a token account with a private key:

1. **Deterministic ATA (Off-Curve)**: Standard Associated Token Accounts that follow the SPL Token program's deterministic derivation - these have no private keys
2. **Custom On-Curve ATA**: Custom token accounts created with randomly generated keypairs - these have private keys but are still controlled by the owner wallet

**Key Discovery**: Token accounts can exist both on-curve (with private keys) and off-curve (deterministic), and a single wallet can own multiple token accounts for the same mint. However, even with the private key of an on-curve token account, only the owner wallet can authorize transactions.

## Features

- ✅ Create deterministic Associated Token Accounts (ATAs) - Off-curve, no private keys
- ✅ Create custom on-curve token accounts with random keypairs - Has private keys
- ✅ Transfer tokens between custom and deterministic accounts
- ✅ Close token accounts when no longer needed
- ✅ Transaction simulation for safety

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Solana CLI tools
- A Solana wallet with SOL for transaction fees

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CUSTOM-OFFCURVE-ATA
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
RPC_URL=your_solana_rpc_url_here
OG_WALLET_SECRET_KEY=your_wallet_secret_key_here
```

## Project Structure

```
src/
├── index.ts              # Main entry point
├── config.ts             # Configuration and utility functions
├── deterministicAta.ts   # Deterministic ATA creation and management
├── customAta.ts          # Custom off-curve ATA creation
└── ataTransfer.ts        # Token transfer functionality
```

## Usage

### Running the Main Example

The main example demonstrates creating both types of token accounts:

```bash
npm run start
# or
npx ts-node src/index.ts
```

This will:
1. Create a deterministic ATA for the specified mint
2. Create a custom off-curve ATA for the same mint
3. Display the addresses of both accounts

### Key Functions

#### Deterministic ATA Creation
```typescript
import { createDeterministicAta } from "./deterministicAta";

const deterministicAta = await createDeterministicAta(mint);
console.log("Deterministic ATA:", deterministicAta.toBase58());
```

#### Custom On-Curve ATA Creation
```typescript
import { createCustomOnCurveAta } from "./customAta";

const customAta = await createCustomOnCurveAta(mint);
if (customAta) {
    console.log("Custom ATA:", customAta.toBase58());
}
```

#### Token Transfer
```typescript
import { transferFromAcc } from "./ataTransfer";

await transferFromAcc(customAtaAddress);
```

## Configuration

### Environment Variables

- `RPC_URL`: Your Solana RPC endpoint (e.g., `https://api.mainnet-beta.solana.com`)
- `OG_WALLET_SECRET_KEY`: Base58-encoded secret key of your wallet

### Default Mint

The project is configured to work with wrapped SOL (`So11111111111111111111111111111111111111112`) by default. You can modify the mint address in `src/config.ts`.

## Technical Details

### The Discovery Story
This project was born from a fascinating discovery: a friend found a private key with over 15 SOL that couldn't be used for transactions. Upon investigation, it turned out to be a **token account for wrapped SOL (wSOL)** rather than a regular wallet account. This discovery revealed that:

- **Token accounts can have private keys** (on-curve accounts)
- **A single wallet can own multiple token accounts for the same mint**
- **Even with the private key, you cannot transact from a token account** - only the owner wallet can authorize transactions

### Deterministic ATA (Off-Curve)
- Uses the SPL Token program's `getOrCreateAssociatedTokenAccount` function
- Address is deterministically derived from the owner's public key and mint
- **Off-curve**: Generated using Program Derived Address (PDA) derivation
- **No private key exists** - controlled entirely by the owner wallet
- Follows the standard ATA derivation formula: `[owner, TOKEN_PROGRAM_ID, mint]`

### Custom On-Curve ATA
- Generates a new keypair for the token account
- Creates a token account at the generated address
- **On-curve**: Uses a real private key (like regular wallet accounts)
- Saves the private key to `privKey.json` for future use
- **Important**: Even with the private key, only the owner wallet can authorize transactions
- Allows for more flexible token account management

### Real-World Example
The wallet that sparked this investigation: `9EnbaVoFqvh4vjz5GWzoo5ZSQp2soxp3n4wNjmKSqepA`

This project demonstrates creating two different wSOL token accounts for the same wallet:
1. **EWZFvXnu1cgGjLnRtLhNkzJNiYzoTAKAzuiLXzdbjLrN** (On-curve custom ATA)
2. **3YHgh8gyMmtTqamZ6RUmYeeZNebY1MKtbSix68cTAQTy** (Off-curve deterministic ATA)

### Key Insights
- **On-curve token accounts** have private keys but are still controlled by the owner wallet
- **Off-curve token accounts** (deterministic ATAs) have no private keys
- **Multiple token accounts** can exist for the same mint under one wallet
- **Private key possession** doesn't grant transaction authority for token accounts

### Transaction Safety
- All transactions are simulated before execution
- Uses versioned transactions for better compatibility
- Includes proper error handling and logging

## Dependencies

- `@solana/spl-token`: SPL Token program interactions
- `@solana/web3.js`: Solana web3 library
- `bs58`: Base58 encoding/decoding
- `dotenv`: Environment variable management

## Development

### TypeScript Configuration
The project uses strict TypeScript configuration with:
- ES2016 target
- CommonJS modules
- Strict type checking enabled
- Skip lib check for faster compilation

### Building
```bash
npx tsc
```

### Running Tests
```bash
# Add test scripts as needed
npm test
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Private Key Storage**: The custom ATA private key is saved to `privKey.json`. In production, use secure key management solutions.
2. **Environment Variables**: Never commit your `.env` file or expose private keys.
3. **Transaction Simulation**: Always simulate transactions before sending them to mainnet.
4. **RPC Endpoints**: Use reliable RPC endpoints for production applications.

## Examples

### Creating Both Account Types
```typescript
const mint = new PublicKey("So11111111111111111111111111111111111111112");

// Create deterministic ATA (off-curve, no private key)
const deterministicAta = await createDeterministicAta(mint);
console.log("Deterministic ATA:", deterministicAta.toBase58());

// Create custom on-curve ATA (has private key)
const customAta = await createCustomOnCurveAta(mint);
if (customAta) {
    console.log("Custom ATA:", customAta.toBase58());
}
```

### Transferring Tokens
```typescript
// Transfer from custom ATA to deterministic ATA
await transferFromAcc(customAtaAddress);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or issues, please open an issue on the repository or contact the maintainers.

---

**Note**: This project is for educational and development purposes. Always test thoroughly on devnet before using on mainnet.
