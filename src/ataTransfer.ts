import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { connection, mint, OG_WALLET } from "./config";




export const transferFromAcc = async (custom_ata:PublicKey) => {
   

    const balance = await connection.getBalance(OG_WALLET.publicKey);

    console.log("here is the user balance----", balance/LAMPORTS_PER_SOL);

    const reciever_add = await getAssociatedTokenAddress(mint,OG_WALLET.publicKey);
    const expected_ata = await getAssociatedTokenAddress(mint,OG_WALLET.publicKey);

    const amount = 0.01*1000000000;
    console.log("here is the reciever balance ---", reciever_add.toBase58());
    console.log("here is the og owner---", OG_WALLET.publicKey.toBase58());
    console.log("here is the og ata w sol ata address ----", custom_ata);
    console.log("here is the user expected DETERMINISTIC ATA---", expected_ata.toBase58());

    const transIx = createTransferInstruction(
        OG_WALLET.publicKey,
        custom_ata,
        OG_WALLET.publicKey,
        amount,
        undefined
    )

    const { blockhash } = await connection.getLatestBlockhash();


    const message = new TransactionMessage({
        payerKey: OG_WALLET.publicKey,
        instructions: [transIx],
        recentBlockhash: blockhash
    }).compileToV0Message();

    const vTx = new VersionedTransaction(message);

    vTx.sign([OG_WALLET]);

    console.log("sending.....");


    const simulate = await connection.simulateTransaction(vTx);
    console.log("here is res--", simulate)

    // const sign = await connection.sendTransaction(vTx);
    // console.log("here is the sign---", sign)
}