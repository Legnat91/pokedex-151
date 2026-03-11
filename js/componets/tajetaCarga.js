const contenedor = document.getElementById("lista-pokemon");

export async function tarjetaCarga(carga =40) {
    
    for (let i = 0; i < carga; i++) {

        contenedor.innerHTML += `
      <div class="bg-zinc-900 rounded-2xl p-4 shadow-md">
        <div class="skeleton h-36 w-full rounded-xl mb-4"></div>
        <div class="skeleton h-6 w-2/3 mb-2"></div>
        <div class="skeleton h-4 w-1/3 mb-4"></div>
        <div class="flex gap-2">
          <div class="skeleton h-6 w-16 rounded-full"></div>
          <div class="skeleton h-6 w-16 rounded-full"></div>
        </div>
      </div>
    `;

    }
    new Promise((resolve, reject) => {
        setTimeout(() => {
            contenedor.innerHTML = "";
        }, 2000)
    })
    return true;
}