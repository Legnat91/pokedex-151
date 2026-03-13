import { cargarPagina } from "./tarjeta.js"; 
export function scrollInfinito() {
    const finalScroll = document.getElementById("final-scroll");

    const observer = new IntersectionObserver(async (entradas) => {
        if (entradas[0].isIntersecting) {
            // Simplemente llamamos a la función. Si ya no hay más, ella misma se detiene.
            await cargarPagina();
        }
    });

    observer.observe(finalScroll);
}