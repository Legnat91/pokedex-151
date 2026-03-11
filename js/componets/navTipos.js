import { coloresFondo, coloresTipo } from "../shared/colores.js";

export function crearNavTipos() {
    const navTipo = document.getElementById("nav-tipos");
    const tiposPokemon = Object.keys(coloresFondo);
   

    for (const tipo of tiposPokemon) {
        const botonTipo = document.createElement("button");
        botonTipo.className = `${coloresFondo[tipo]} px-3 py-1 rounded cursor-pointer hover:${coloresTipo[tipo]} hover:text-white`;
        botonTipo.dataset.tipo = tipo;
        botonTipo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);

        navTipo.appendChild(botonTipo);
    }
}