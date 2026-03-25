import { obtenerListaMaestra, obtenerDetallePokemon } from "../service/api.js";
import { coloresTipo, coloresFondo } from "../shared/colores.js";
import { tarjetaModal } from "../componets/tarjetaModal.js";
import { crearBotonFavorito } from "./marcarFavorito.js";
import { mostrarTarjetaCarga, ocultarTarjetaCarga } from "../componets/tajetaCarga.js";

let listaActualUrls = [];
let offset = 0;
const limit = 20;
let cargando = false;
let actualizando = false;

const listaPokemonDOM = document.getElementById("lista-pokemon");
const mensajeNoEncontrado = document.getElementById("mensaje-no-encontrado");

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function actualizarVista(tiposSeleccionados, textoBusqueda, mostrarFavoritos) {
    actualizando = true;
    cargando = false;

    listaPokemonDOM.innerHTML = "";
    offset = 0;
    mostrarTarjetaCarga(10);

    let lista = await obtenerListaMaestra(tiposSeleccionados);

    if (textoBusqueda !== "") {
        lista = lista.filter(p => p.name.includes(textoBusqueda));
    }

    if (mostrarFavoritos) {
        const favs = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        lista = lista.filter(p => {
            const id = parseInt(p.url.split('/').filter(Boolean).pop());
            return favs.includes(id);
        });
    }

    listaActualUrls = lista;
    ocultarTarjetaCarga();

    actualizando = false;

    if (listaActualUrls.length === 0) {
        mensajeNoEncontrado.classList.remove("hidden");
    } else {
        mensajeNoEncontrado.classList.add("hidden");
        await cargarPagina();
    }
}


export async function cargarPagina() {
    // Si estamos filtrando (actualizando) o cargando, el observer rebota aquí
    if (cargando || actualizando) return;
    if (offset >= listaActualUrls.length) return;

    cargando = true;
    const limiteReal = Math.min(limit, listaActualUrls.length - offset);

    const urlsPagina = listaActualUrls.slice(offset, offset + limiteReal);

    mostrarTarjetaCarga(limiteReal);
    await esperar(1000);

    const promesasDetalles = urlsPagina.map((p) => obtenerDetallePokemon(p.url));
    const detallesPokemon = await Promise.all(promesasDetalles);

    ocultarTarjetaCarga();

    for (const detalle of detallesPokemon) {
        const tipo = detalle.types[0].type.name;

        const li = document.createElement("li");
        li.className = `font-pokemon flex flex-col items-center p-3 mx-4 mt-3 bg-white/60 hover:${coloresFondo[tipo]} backdrop-blur-md border border-white/50 rounded-lg shadow transition cursor-pointer hover:scale-105 relative`;
        li.dataset.tipo = detalle.types.map(t => t.type.name).join(" ");
        li.dataset.nombre = detalle.name.toLowerCase();
        li.dataset.id = detalle.id;
        li.draggable = true; // Hacemos que el LI sea el que se arrastre

        li.addEventListener("dragstart", (e) => {
            // Guardamos el ID en el objeto de transferencia
            e.dataTransfer.setData("text/plain", detalle.id);
            e.dataTransfer.effectAllowed = "copy"; // Indica que vamos a copiar el dato

            // Opcional: Crear una imagen fantasma personalizada para que no se vea feo
            const dragImage = li.querySelector('img');
            e.dataTransfer.setDragImage(dragImage, 40, 40);

            li.classList.add("opacity-50");
        });

        li.addEventListener("dragend", () => {
            li.classList.remove("opacity-50");
        });

        // Evitar que la imagen interna sea la que se arrastre por separado (esto causa errores)


        const contendorTipo = document.createElement("div");
        contendorTipo.className = "flex gap-2";

        const img = document.createElement("img");
        img.className = "w-16 h-16 md:w-40 md:h-40 object-cover rounded";
        img.alt = `imagen-${detalle.name}`;
        img.src = detalle.sprites.front_default;
        img.draggable = false;
        const numero = document.createElement("span");
        numero.className = "font-semibold text-gray-800 text-xs";
        numero.textContent = `#${detalle.id.toString().padStart(3, "0")}`;

        const botonFavorito = crearBotonFavorito(detalle.id);

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

        li.append(botonFavorito, numero, img, nombre, contendorTipo);

        li.addEventListener("click", () => {
            const modal = tarjetaModal(detalle, coloresTipo);
            modal.abrirModal();
        });

        listaPokemonDOM.appendChild(li);
    }

    offset += limiteReal;
    cargando = false;
}

export function getOffset() { return offset; }