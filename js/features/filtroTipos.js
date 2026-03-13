import { toggleTipoSeleccionado } from "./filtros.js";

export function activarFiltro() {
    const navTipo = document.getElementById("nav-tipos");

    navTipo.addEventListener("click", (evento) => {
        // Usamos .closest() por si haces click en el texto dentro del botón
        const boton = evento.target.closest('button[data-tipo]');

        if (!boton) return; // Si no hizo click en un botón válido, salimos

        const tipo = boton.dataset.tipo;
        
        // Llamamos a nuestra nueva función
        toggleTipoSeleccionado(tipo);

        if (tipo === "todos") {
            // Si pulsa "Todos", quitamos la selección visual de todos los botones
            const todosLosBotones = navTipo.querySelectorAll('button[data-tipo]');
            todosLosBotones.forEach(btn => {
                btn.classList.remove('ring-2', 'ring-black', 'scale-110', 'opacity-50');
            });
        } else {
            // Si pulsa un tipo, le añadimos (o quitamos) un borde negro y un escalado
            boton.classList.toggle('ring-2');
            boton.classList.toggle('ring-black');
            boton.classList.toggle('scale-110');
            
            // Le bajamos la opacidad a "Todos" para que se note que ya no está activo
            const botonTodos = navTipo.querySelector('button[data-tipo="todos"]');
            if (botonTodos) botonTodos.classList.add('opacity-50');
        }
    });
}