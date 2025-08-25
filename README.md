# Custom Off-Curve ATA (Associated Token Account)

A Solana TypeScript project demonstrating the creation and management of custom off-curve Associated Token Accounts (ATAs) alongside traditional deterministic ATAs.

## Overview

This project showcases two different approaches to creating token accounts on Solana:

1. **Deterministic ATA**: Standard Associated Token Accounts that follow the SPL Token program's deterministic derivation
2. **Custom Off-Curve ATA**: Custom token accounts created with randomly generated keypairs, allowing for more flexible token account management

## Features

- ✅ Create deterministic Associated Token Accounts (ATAs)
- ✅ Create custom off-curve token accounts with random keypairs
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

#### Custom Off-Curve ATA Creation
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

### Deterministic ATA
- Uses the SPL Token program's `getOrCreateAssociatedTokenAccount` function
- Address is deterministically derived from the owner's public key and mint
- Follows the standard ATA derivation formula

### Custom Off-Curve ATA
- Generates a new keypair for the token account
- Creates a token account at the generated address
- Saves the private key to `privKey.json` for future use
- Allows for more flexible token account management

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

// Create deterministic ATA
const deterministicAta = await createDeterministicAta(mint);
console.log("Deterministic ATA:", deterministicAta.toBase58());

// Create custom off-curve ATA
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
