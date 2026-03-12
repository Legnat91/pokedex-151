import { crearNavTipos } from "./componets/navTipos.js";
import { buscadorPokemon } from "./features/buscador.js";
import { activarFiltro } from "./features/filtroTipos.js";
import { scrollInfinito } from "./features/scroll.js";
import { tarjetas } from "./features/tarjeta.js";

document.addEventListener("DOMContentLoaded", async () => {
    

    await tarjetas();
  
    crearNavTipos();
    activarFiltro();
    buscadorPokemon();
    scrollInfinito();
});