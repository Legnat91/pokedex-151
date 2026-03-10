export function buscadorPokemon(){
    const input = document.getElementById("buscadorPokemon");
    const tarjetas = document.querySelectorAll("#lista-pokemon li");

    input.addEventListener("input", () => {
        const inputBuscador = input.value.trim().toLowerCase();

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.textContent.toLowerCase();

            if (nombre.includes(inputBuscador)){
                tarjeta.style.display = "flex";
            } else {
                tarjeta.style.display = "none";
            }
        });
    });
}