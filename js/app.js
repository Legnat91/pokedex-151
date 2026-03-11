import { crearNavTipos } from "./componets/navTipos.js";
import { tarjetaCarga } from "./componets/tajetaCarga.js";
import { buscadorPokemon } from "./features/buscador.js";
import { scrollInfinito } from "./features/scroll.js";
import { tarjetas } from "./features/tarjeta.js";
document.addEventListener("DOMContentLoaded", async () => {
        
    
    await tarjetas();
    
    crearNavTipos();
    buscadorPokemon();
    scrollInfinito();


});