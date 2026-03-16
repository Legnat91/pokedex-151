import { coloresFondo, coloresTipo } from "../shared/colores.js";
import { modoFiltroFavorito } from "../features/filtros.js";

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

    const fav = document.createElement("button");
    fav.className = "px-3 py-1 rounded cursor-pointer transition-colors duration-300 text-red-500 bg-white shadow-sm";
    fav.dataset.filtroEspecial = "favoritos";
    fav.innerHTML = `<svg id="filtroFav" class="w-6 h-6  drop-shadow-md" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M3 12h6" /><path d="M15 12h6" /></svg>`;
    let filtroFavoritosActivo = false;
    fav.addEventListener("click", () => {
        filtroFavoritosActivo = !filtroFavoritosActivo; // Alternamos estado

        if (filtroFavoritosActivo) {
            // Estilo ACTIVO (Fondo rojo, icono blanco)
            fav.classList.replace("bg-white", "bg-red-500");
            fav.classList.replace("text-red-500", "text-white");
        } else {
            // Estilo INACTIVO (Fondo blanco, icono rojo)
            fav.classList.replace("bg-red-500", "bg-white");
            fav.classList.replace("text-white", "text-red-500");
        }

        // Llamamos a la función del filtro
        modoFiltroFavorito(filtroFavoritosActivo);
    });
    navTipo.appendChild(fav);


}