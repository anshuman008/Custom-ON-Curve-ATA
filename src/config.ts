import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import dotenv from "dotenv";
import bs58 from "bs58";
dotenv.config();


export const connection = new Connection(process.env.RPC_URL!, "finalized");
export const OG_WALLET = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(process.env.OG_WALLET_SECRET_KEY!)));
export const mint = new PublicKey("So11111111111111111111111111111111111111112")



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