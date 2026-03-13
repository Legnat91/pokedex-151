import { setTextoBusqueda } from "./filtros.js";

export function buscadorPokemon() {
    const input = document.getElementById("buscadorPokemon");

    input.addEventListener("input", () => {
        // Le pasamos la palabra al jefe de los filtros
        setTextoBusqueda(input.value);
    });
}