
import {
  createInitializeAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Keypair,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import fs from "fs";
import bs58 from "bs58";
import { connection, getBlockhash, mint, OG_WALLET } from "./config";


export const createCustomOnCurveAta = async () => {
  
    const newPair = Keypair.generate();
  
    fs.writeFileSync("usdcprivKey.json", JSON.stringify(bs58.encode(newPair.secretKey)));
  
    console.log("here is the newPair address--", newPair.publicKey.toBase58());
  
    const createItx = SystemProgram.createAccount({
      fromPubkey: OG_WALLET.publicKey,
      newAccountPubkey: newPair.publicKey,
      lamports: 2039280,
      space: 165,
      programId: TOKEN_PROGRAM_ID,
    });
  
    const initializItx = createInitializeAccountInstruction(
      newPair.publicKey,
      mint,
      OG_WALLET.publicKey
    );

    const recent_block = await getBlockhash();
  
    const message = new TransactionMessage({
      payerKey: OG_WALLET.publicKey,
      recentBlockhash: recent_block,
      instructions: [createItx, initializItx],
    }).compileToV0Message();
  
    const txs = new VersionedTransaction(message);
    txs.sign([OG_WALLET, newPair]);
  
    console.log("sending transaction");
  

    const simulations = await connection.simulateTransaction(txs);
    console.log("here is simulaion--", simulations);

    // const sign = await connection.sendTransaction(txs);
    // console.log("here is the signature----", sign);
  };
  

  createCustomOnCurveAta();