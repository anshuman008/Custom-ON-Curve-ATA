import {
  createAssociatedTokenAccount,
  createCloseAccountInstruction,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  connection,
  findAssociatedTokenAddress,
  OG_WALLET,
} from "./config";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

export const createDeterministicAta = async (mint:PublicKey):Promise<PublicKey> => {

  const expected_ata = findAssociatedTokenAddress(mint, OG_WALLET.publicKey);
  console.log("here is the expected ata ----", expected_ata);


  const deterministic_ata = await getOrCreateAssociatedTokenAccount(
    connection,
    OG_WALLET,
    mint,
    OG_WALLET.publicKey,
    false,
    "finalized",
    {commitment:"finalized"},
    TOKEN_PROGRAM_ID
  );

  console.log("here is the new ata ---", deterministic_ata.address);

  return deterministic_ata.address;
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
