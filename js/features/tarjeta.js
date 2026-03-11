import { obtenerPokeApi, obtenerDetallePokemon } from "../service/api.js";
import { coloresTipo, coloresFondo } from "../shared/colores.js";
import { tarjetaModal } from "../componets/tarjetaModal.js";
import { aplicarFiltros } from "./filtros.js";
import { crearBotonFavorito } from "./marcarFavorito.js";
import { mostrarTarjetaCarga, ocultarTarjetaCarga } from "../componets/tajetaCarga.js";
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

    
    mostrarTarjetaCarga(limiteReal); 

    
    const datos = await obtenerPokeApi(limiteReal, offset);

    const promesasDetalles = datos.results.map((pokemon) =>
        obtenerDetallePokemon(pokemon.url)
    );

    const detallesPokemon = await Promise.all(promesasDetalles);

 
    ocultarTarjetaCarga();
    
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

        const botonFavorito = crearBotonFavorito(detalle.id);

        li.classList.add("relative");

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
        li.appendChild(botonFavorito);
        li.appendChild(numero);
        li.appendChild(img);

        li.appendChild(nombre);
        li.appendChild(contendorTipo);

        li.addEventListener("click", () => {
            const modal = tarjetaModal(detalle, coloresTipo);
            modal.abrirModal();
        });


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