import { obtenerPokeApi, obtenerDetallePokemon } from "../service/api.js";
import { coloresTipo, coloresFondo } from "../shared/colores.js";
import { tarjetaModal } from "../componets/tarjetaModal.js";
import { aplicarFiltros } from "./filtros.js";

let offset = 0;
const limit = 151;
const MAX_POKEMON = 151;
let cargando = false;

export async function tarjetas() {
    if (cargando) {
        return;
    }

    if (offset >= MAX_POKEMON) {
        return;
    }

    cargando = true;

    const listaPokemon = document.getElementById("lista-pokemon");
    const limiteReal = Math.min(limit, MAX_POKEMON - offset);

    const datos = await obtenerPokeApi(limiteReal, offset);

    const promesasDetalles = datos.results.map((pokemon) =>
        obtenerDetallePokemon(pokemon.url)
    );

    const detallesPokemon = await Promise.all(promesasDetalles);

    for (const detalle of detallesPokemon) {
        const tipo = detalle.types[0].type.name;

        const li = document.createElement("li");
        li.className = `font-pokemon flex flex-col items-center p-3 mx-4 mt-3 bg-white/60 hover:${coloresFondo[tipo]} backdrop-blur-md border border-white/50 rounded-lg shadow transition cursor-pointer hover:scale-105`;
        li.dataset.tipo = detalle.types.map(tipo => tipo.type.name).join(" ");
        li.dataset.nombre = detalle.name.toLowerCase();

        const contendorTipo = document.createElement("div");
        contendorTipo.className = "flex gap-2";

        const img = document.createElement("img");
        img.className = "w-16 h-16 md:w-40 md:h-40 object-cover rounded";
        img.alt = `imagen-${detalle.name}`;
        img.src = detalle.sprites.front_default;

        const numero = document.createElement("span");
        numero.className = "font-semibold text-gray-800 text-xs";
        numero.textContent = `#${detalle.id.toString().padStart(3, "0")}`;

        const fav = document.createElement("span");

     
        const svgNoFav = `<svg id="noFav" class="w-6 h-6 text-gray-400 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.04 16.048a9 9 0 0 0 -12.083 -12.09m-2.32 1.678a9 9 0 1 0 12.737 12.719" /><path d="M9.884 9.874a3 3 0 1 0 4.24 4.246m.57 -3.441a3.012 3.012 0 0 0 -1.41 -1.39" /><path d="M3 12h6m7 0h5" /><path d="M3 3l18 18" /></svg>`;
        const svgFav = `<svg id="fav" class="w-6 h-6 text-red-500 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M3 12h6" /><path d="M15 12h6" /></svg>`;

        
        const botonFav = document.createElement("button");
        botonFav.className = "absolute top-2 right-2 p-1 cursor-pointer transition-transform hover:scale-125 z-10"; 
        
        
        // Leemos la lista de favoritos guardada (si no hay nada, creamos un array vacío)
        let favoritosGuardados = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        
        // Comprobamos si el ID de ESTE Pokémon está en el array de favoritos
        let esFavorito = favoritosGuardados.includes(detalle.id); 

        // Ponemos el SVG correspondiente al cargar la tarjeta por primera vez
        botonFav.innerHTML = esFavorito ? svgFav : svgNoFav;

        // El evento de clic para alternar
        botonFav.addEventListener("click", (evento) => {
            evento.stopPropagation(); 
            
            // Volvemos a leer el localStorage por si añadiste otro favorito hace un segundo
            let favoritosActualizados = JSON.parse(localStorage.getItem('misFavoritos')) || [];

            esFavorito = !esFavorito; 

            if (esFavorito) {
                botonFav.innerHTML = svgFav;
                // Si lo marcamos como favorito, metemos su ID al array (si no estaba ya)
                if (!favoritosActualizados.includes(detalle.id)) {
                    favoritosActualizados.push(detalle.id);
                }
            } else {
                botonFav.innerHTML = svgNoFav;
                // Si lo desmarcamos, filtramos el array para quitar su ID
                favoritosActualizados = favoritosActualizados.filter(id => id !== detalle.id);
            }

            
            // Guardamos el array actualizado en el localStorage, convertido a texto
            localStorage.setItem('misFavoritos', JSON.stringify(favoritosActualizados));
        });

        
        li.classList.add("relative");

    
        li.appendChild(botonFav);

        const nombre = document.createElement("span");
        nombre.className = "text-black capitalize";
        nombre.textContent = detalle.name;

        const tipo1 = document.createElement("span");
        tipo1.className = `text-white text-xs p-1 rounded ${coloresTipo[tipo]} capitalize`;
        tipo1.textContent = tipo;

        contendorTipo.appendChild(tipo1);

        if (detalle.types[1]) {
            const tipoSegundo = detalle.types[1].type.name;
            const tipo2 = document.createElement("span");
            tipo2.className = `text-white  text-xs p-1 rounded ${coloresTipo[tipoSegundo]} capitalize`;
            tipo2.textContent = tipoSegundo;
            contendorTipo.appendChild(tipo2);
        }

        li.appendChild(numero);
        li.appendChild(img);

        li.appendChild(nombre);
        li.appendChild(contendorTipo);

        li.addEventListener("click", () => {
            const modal = tarjetaModal(detalle, coloresTipo);
            modal.abrirModal();
        });

        li.append(fav)

        listaPokemon.appendChild(li);
    }

    offset += limiteReal;
    cargando = false;
    aplicarFiltros();
}

export function getOffset() {
    return offset;
}

export function getMaxPokemon() {
    return MAX_POKEMON;
}