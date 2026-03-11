const contenedorSkeleton = document.getElementById("skeleton-pokemon");

export function mostrarTarjetaCarga(carga = 20) {
    let htmlTemporal = "";

for (let i = 0; i < carga; i++) {
        htmlTemporal += `
        <li class="relative flex flex-col items-center justify-center p-3 mx-4 mt-3 w-32 h-48 md:w-48 md:h-64 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg shadow animate-pulse">
            <img src="./img/reverso-carta.png" alt="Cargando Pokémon..." class="w-full h-full object-contain opacity-70">
        </li>
        `;
    }

    contenedorSkeleton.innerHTML = htmlTemporal;
}

export function ocultarTarjetaCarga() {
    contenedorSkeleton.innerHTML = "";
}