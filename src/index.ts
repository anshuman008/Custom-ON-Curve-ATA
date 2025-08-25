import { mint } from "./config";
import { createCustomOnCurveAta } from "./customAta";
import { createDeterministicAta } from "./deterministicAta"





const main = async() => {


  const deterministic_ata = await  createDeterministicAta(mint);
  console.log("here is deterministic_ata ---", deterministic_ata.toBase58());



  const customAta = await createCustomOnCurveAta(mint);

  if(customAta){
    console.log("here is the custom ata for the same mint!---", customAta.toBase58());
  }


}

main();