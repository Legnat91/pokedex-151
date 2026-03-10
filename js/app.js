import { buscadorPokemon } from "./features/buscador.js";
import { tarjetas } from "./features/tarjeta.js";
document.addEventListener("DOMContentLoaded",async()=>{
await tarjetas();
buscadorPokemon();

});