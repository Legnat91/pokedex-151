const contenedorSkeleton = document.getElementById("skeleton-pokemon");

export function mostrarTarjetaCarga(carga = 20) {
    contenedorSkeleton.innerHTML = "";

    for (let i = 0; i < carga; i++) {
        contenedorSkeleton.innerHTML += `
          <li class="relative mx-4 mt-3 w-40 md:w-56 h-56 md:h-72 rounded-lg overflow-hidden shadow">
    <div class="skeleton absolute inset-0"></div>
</li>
        `;
    }
}

export function ocultarTarjetaCarga() {
    contenedorSkeleton.innerHTML = "";
}