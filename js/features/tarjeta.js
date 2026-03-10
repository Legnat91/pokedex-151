import { obtenerPokeApi, obtenerDetallePokemon } from "../service/api.js";
import { coloresTipo,coloresFondo } from "../shared/colores.js";
import { tarjetaModal } from "../componets/tarjetaModal.js";

export async function tarjetas() {
    const listaPokemon = document.getElementById("lista-pokemon");

    
    const datos = await obtenerPokeApi();

    for (const pokemon of datos.results) {
        const detalle = await obtenerDetallePokemon(pokemon.url);

        const tipo = detalle.types[0].type.name;


        const li = document.createElement("li");
        li.className = `flex flex-col items-center p-3 mx-2 mt-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-lg shadow hover:${coloresFondo[tipo]} transition cursor-pointer`;

        const contendorTipo = document.createElement("div");
        contendorTipo.className = "flex gap-2";

        const img = document.createElement("img");
        img.className = "w-16 h-16 md:w-40 md:h-40 object-cover rounded";
        img.alt = `imagen-${detalle.name}`;
        img.src = detalle.sprites.front_default;

        const numero = document.createElement("span");
        numero.className = "font-semibold text-gray-800";
        numero.textContent = `Nº: ${detalle.id}`;

        const nombre = document.createElement("span");
        nombre.className = "text-black";
        nombre.textContent = detalle.name.charAt(0).toUpperCase() + detalle.name.slice(1);


        const tipo1 = document.createElement("span");
        tipo1.className = `text-white text-xs p-1 rounded ${coloresTipo[tipo]}`;
        tipo1.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);

        contendorTipo.appendChild(tipo1);

        if (detalle.types[1]) {
            const tipoSegundo = detalle.types[1].type.name;
            const tipo2 = document.createElement("span");
            tipo2.className = `text-white text-xs p-1 rounded ${coloresTipo[tipoSegundo]}`
            tipo2.textContent = tipoSegundo.charAt(0).toUpperCase() + tipoSegundo.slice(1);
            contendorTipo.appendChild(tipo2);
        }

        li.appendChild(img);
        li.appendChild(numero);
        li.appendChild(nombre);
        li.appendChild(contendorTipo);

        li.addEventListener("click", () => {
            const modal = tarjetaModal(detalle, coloresTipo);
            modal.abrirModal();
        });

        listaPokemon.appendChild(li);

    }
}