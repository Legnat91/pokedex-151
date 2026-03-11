import { setTipoSeleccionado } from "./filtros.js";

export function activarFiltro() {
    const navTipo = document.getElementById("nav-tipos");

    navTipo.addEventListener("click", (evento) => {
        const boton = evento.target;

        if (!boton.dataset.tipo) {
            return;
        }

        const tipo = boton.dataset.tipo;
        setTipoSeleccionado(tipo);
    });
}