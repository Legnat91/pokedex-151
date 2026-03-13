import { crearNavTipos } from "./componets/navTipos.js";
import { buscadorPokemon } from "./features/buscador.js";
import { activarFiltro } from "./features/filtroTipos.js";
import { scrollInfinito } from "./features/scroll.js";
import { actualizarVista } from "./features/tarjeta.js"; 

document.addEventListener("DOMContentLoaded", async () => {
    // Arrancamos la vista por defecto (vacío = trae los 151)
    await actualizarVista([], "", false); 
  
    crearNavTipos();
    activarFiltro();
    buscadorPokemon();
    scrollInfinito();
});