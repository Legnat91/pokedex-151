export function buscadorPokemon() {
    const input = document.getElementById("buscadorPokemon");
    const mensaje = document.getElementById("mensaje-no-encontrado");

    input.addEventListener("input", () => {
        const inputBuscador = input.value.trim().toLowerCase();
        const tarjetas = document.querySelectorAll("#lista-pokemon li");

        let encontrado = false;

        tarjetas.forEach((tarjeta) => {
            const nombre = tarjeta.dataset.nombre;

            if (nombre.includes(inputBuscador)) {
                tarjeta.style.display = "flex";
                encontrado = true;
            } else {
                tarjeta.style.display = "none";
            }
        });

        if (encontrado) {
            mensaje.classList.add("hidden");
        } else {
            mensaje.classList.remove("hidden");
        }
    });
}