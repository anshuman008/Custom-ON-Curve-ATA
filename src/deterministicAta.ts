import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccount,
  createCloseAccountInstruction,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  connection,
  findAssociatedTokenAddress,
  mint,
  OG_WALLET,
} from "./config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export const createDeterministicAta = async () => {

  const expected_ata = findAssociatedTokenAddress(mint, OG_WALLET.publicKey);
  console.log("here is the expected ata ----", expected_ata);


  const createAtaIx = await createAssociatedTokenAccount(
    connection,
    OG_WALLET,
    mint,
    OG_WALLET.publicKey,
    { commitment: "finalized" },
    TOKEN_PROGRAM_ID
  );

  console.log("here is the new ata ---", createAtaIx.toBase58());
};

export const closeDeterministicAta = async (
  ata_address: PublicKey,
  owner: Keypair
) => {
  const { blockhash } = await connection.getLatestBlockhash();

  const tokenBalance = await connection.getTokenAccountBalance(owner.publicKey);
  const solBalance = await connection.getBalance(owner.publicKey);

  console.log("here is the ata --", owner.publicKey.toBase58());
  console.log("Token balance: --", tokenBalance.value.uiAmount);
  console.log("SOL balance: --", solBalance / LAMPORTS_PER_SOL);

  //@ts-ignore
  if (tokenBalance.value.uiAmount > 0) {
    console.log("Cannot close ATA - still has tokens");
    return;
  }

  const closeInstruction = createCloseAccountInstruction(
    ata_address,
    owner.publicKey,
    owner.publicKey
  );

  const message = new TransactionMessage({
    payerKey: owner.publicKey,
    recentBlockhash: blockhash,
    instructions: [closeInstruction],
  }).compileToV0Message();

  const txs = new VersionedTransaction(message);
  txs.sign([owner]);

  const sendTxs = await connection.simulateTransaction(txs);
  console.log("Simulation result:", sendTxs);
};
