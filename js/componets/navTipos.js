import { coloresFondo, coloresTipo } from "../shared/colores.js";

export function crearNavTipos() {
    const navTipo = document.getElementById("nav-tipos");
    const tiposPokemon = Object.keys(coloresFondo);

    const botonTodos = document.createElement("button");
    botonTodos.textContent = "Todos";
    botonTodos.dataset.tipo = "todos";
    botonTodos.className = "bg-white px-3 py-1 rounded cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-red-500 via-green-500 to-blue-500";

    navTipo.appendChild(botonTodos);

    for (const tipo of tiposPokemon) {
        const botonTipo = document.createElement("button");
        botonTipo.className = `${coloresFondo[tipo]} px-3 py-1 rounded cursor-pointer hover:${coloresTipo[tipo]} hover:text-white`;
        botonTipo.dataset.tipo = tipo;
        botonTipo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);

        navTipo.appendChild(botonTipo);
    }
}