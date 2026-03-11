import { tarjetas, getOffset, getMaxPokemon } from "./tarjeta.js";

export function scrollInfinito() {
    const finalScroll = document.getElementById("final-scroll");

    const observer = new IntersectionObserver(async (entradas) => {
        if (entradas[0].isIntersecting) {
            if (getOffset() >= getMaxPokemon()) {
                observer.unobserve(finalScroll);
                return;
            }

            await tarjetas();

            if (getOffset() >= getMaxPokemon()) {
                observer.unobserve(finalScroll);
            }
        }
    });

    observer.observe(finalScroll);
}