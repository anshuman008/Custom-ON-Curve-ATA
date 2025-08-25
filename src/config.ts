import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import dotenv from "dotenv";
dotenv.config();

export const connection = new Connection(process.env.RPC_URL!, "finalized");

export const getBlockhash = async () => {
    const blockhash = await connection.getLatestBlockhash();
    return blockhash.blockhash;
}


export const findAssociatedTokenAddress =  (walletAddress:any, tokenMintAddress:any) => {
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