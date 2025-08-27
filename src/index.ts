import { mint } from "./config";
import { createCustomOnCurveAta } from "./customSplAccount";
import { createDeterministicAta } from "./deterministicAta"





const main = async() => {


  const deterministic_ata = await  createDeterministicAta(mint);
  console.log("here is deterministic_ata ---", deterministic_ata.toBase58());



  const customSplTokenAccount = await createCustomOnCurveAta(mint);

  if(customSplTokenAccount){
    console.log("here is the custom ata for the same mint!---", customSplTokenAccount.toBase58());
  }

}

main();