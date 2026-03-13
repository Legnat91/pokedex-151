import { actualizarVista } from "./tarjeta.js";

//Variables de estado globales
let textoBusqueda = "";
let tiposSeleccionados = []; 
let mostrarFavoritos = false; 

// Modificadores de estado
export function setTextoBusqueda(texto) {
    textoBusqueda = texto.toLowerCase().trim();
    aplicarFiltros();
}

export function toggleTipoSeleccionado(tipo) {
    if (tipo === "todos") {
        tiposSeleccionados = []; 
    } else {
        if (tiposSeleccionados.includes(tipo)) {
            tiposSeleccionados = tiposSeleccionados.filter(t => t !== tipo);
        } else {
            tiposSeleccionados.push(tipo);
        }
    }
    aplicarFiltros();
}

export function modoFiltroFavorito(activo) {
    mostrarFavoritos = activo; 
    aplicarFiltros();
}

//  El ejecutor principal
export function aplicarFiltros() {
    actualizarVista(tiposSeleccionados, textoBusqueda, mostrarFavoritos);
}