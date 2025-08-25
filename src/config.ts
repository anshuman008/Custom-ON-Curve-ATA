import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

export const connection = new Connection(process.env.RPC_URL!, "finalized");
export const mint = new PublicKey(process.env.MINT_ADDRESS!);
export const OG_WALLET = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.OG_WALLET_SECRET_KEY!)));

export const getBlockhash = async () => {
    const blockhash = await connection.getLatestBlockhash();
    return blockhash.blockhash;
}


export const findAssociatedTokenAddress =  (walletAddress:PublicKey, tokenMintAddress:PublicKey) => {
    return (
       PublicKey.findProgramAddressSync(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    )[0];
  };