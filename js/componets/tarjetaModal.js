import { crearBotonFavorito } from "../features/marcarFavorito.js";
import { obtenerEvoluciones } from "../service/api.js";

export function tarjetaModal(detalle, coloresTipo) {
    const pantallaCompleta = document.createElement("div");
    pantallaCompleta.className = "hidden fixed inset-0 bg-black/40 flex items-center justify-center z-50";
    pantallaCompleta.id = "pantallaCompleta";
    const ventanaDetalles = document.createElement("div");
    ventanaDetalles.className = "relative bg-white w-full max-w-lg p-8 rounded-xl flex flex-col gap-4 shadow-xl";

    // BOTON CERRAR
    const botonCerrar = document.createElement("button");
    botonCerrar.textContent = "✕";
    botonCerrar.className = "absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black cursor-pointer";

    // DATOS POKEMON
    const contenedorDatos = document.createElement("div");
    contenedorDatos.className = "flex flex-col items-center gap-3";

    const img = document.createElement("img");
    img.className = "w-16 h-16 md:w-40 md:h-40 object-cover rounded";
    img.src = detalle.sprites.front_default;
    img.alt = detalle.name;

    const numero = document.createElement("span");
    numero.className = "font-semibold text-gray-800";
    numero.textContent = `#${detalle.id.toString().padStart(3, "0")}`;

    const nombre = document.createElement("h2");
    nombre.className = "text-black text-2xl font-bold capitalize";
    nombre.textContent = detalle.name;

    const descripcion = document.createElement("p");
    descripcion.className = "text-black text-xl "

    const contenedorTipo = document.createElement("div");
    contenedorTipo.className = "flex gap-2";

    const tipo1 = detalle.types[0].type.name;
    const badge1 = document.createElement("span");
    badge1.className = `text-white text-xs px-3 py-1 rounded-full ${coloresTipo[tipo1] || "bg-gray-500"} capitalize`;
    badge1.textContent = tipo1;
    contenedorTipo.appendChild(badge1);

    if (detalle.types[1]) {
        const tipoSegundo = detalle.types[1].type.name;
        const badge2 = document.createElement("span");
        badge2.className = `text-white text-xs px-3 py-1 rounded-full ${coloresTipo[tipoSegundo] || "bg-gray-500"}`;
        badge2.textContent = tipoSegundo.charAt(0).toUpperCase() + tipoSegundo.slice(1);
        contenedorTipo.appendChild(badge2);
    }

    const botonFavorito = crearBotonFavorito(detalle.id);


    // STATS
    const contenedorStats = document.createElement("div");
    contenedorStats.className = "mt-4 flex flex-col gap-3";

    detalle.stats.forEach((stat) => {
        const fila = document.createElement("div");
        fila.className = "flex flex-col gap-1";

        const arriba = document.createElement("div");
        arriba.className = "flex justify-between text-sm";

        const nombreStat = document.createElement("span");
        nombreStat.className = "capitalize text-gray-700";
        nombreStat.textContent = stat.stat.name.replace("-", " ");

        const valorStat = document.createElement("span");
        valorStat.className = "font-semibold text-gray-900";
        valorStat.textContent = stat.base_stat;

        arriba.append(nombreStat, valorStat);

        const barraFondo = document.createElement("div");
        barraFondo.className = "w-full h-3 bg-gray-200 rounded-full overflow-hidden";

        const barraValor = document.createElement("div");
        barraValor.className = "h-full bg-blue-500 rounded-full";
        barraValor.style.width = `${Math.min(stat.base_stat, 100)}%`;

        barraFondo.appendChild(barraValor);
        fila.append(arriba, barraFondo);
        contenedorStats.appendChild(fila);
    });


    //EVOLUCIONES
    const tituloEvolucion = document.createElement("h3");
    tituloEvolucion.className = "text-xl font-bold text-gray-800 mt-4 text-center w-full";
    tituloEvolucion.textContent = "Evoluciones";

    const contenedorEvoluciones = document.createElement("div");
    contenedorEvoluciones.className = "flex items-center justify-center gap-2 mt-2 w-full overflow-x-auto p-2";

    // Ponemos un texto de carga temporal
    contenedorEvoluciones.innerHTML = "<p class='text-gray-400 text-sm'>Cargando evoluciones...</p>";

    // Llamamos a la API de forma asíncrona
    obtenerEvoluciones(detalle.species.url).then(evoluciones => {
        contenedorEvoluciones.innerHTML = ""; // Limpiamos el texto de carga

        evoluciones.forEach((evo, index) => {
            //  Creamos la cajita del Pokémon
            const cajaEvo = document.createElement("div");
            cajaEvo.className = "flex flex-col items-center";

            const imgEvo = document.createElement("img");
            imgEvo.src = evo.imagen;
            imgEvo.className = "w-16 h-16 bg-gray-100 rounded-full shadow-sm";

            const nombreEvo = document.createElement("span");
            nombreEvo.className = "capitalize text-xs font-semibold mt-1 text-gray-700";
            nombreEvo.textContent = evo.nombre;

            cajaEvo.append(imgEvo, nombreEvo);
            contenedorEvoluciones.appendChild(cajaEvo);

            //  Si NO es el último Pokémon de la lista, añadimos la flecha
            if (index < evoluciones.length - 1) {
                const flecha = document.createElement("div");
                flecha.className = "text-gray-400 px-2";

                flecha.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>`;
                contenedorEvoluciones.appendChild(flecha);
            }
        });
    });

    contenedorDatos.append(botonFavorito, img, numero, nombre, contenedorTipo, tituloEvolucion, contenedorEvoluciones);
    ventanaDetalles.append(botonCerrar, contenedorDatos, contenedorStats);
    pantallaCompleta.appendChild(ventanaDetalles);
    document.body.appendChild(pantallaCompleta);

    function abrirModal() {
        pantallaCompleta.classList.remove("hidden");
    }

    function cerrarModal() {
        pantallaCompleta.classList.add("hidden");
    }

    botonCerrar.addEventListener("click", cerrarModal);

    pantallaCompleta.addEventListener("click", (e) => {
        if (e.target === pantallaCompleta) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" || e.key === "Esc") {
            cerrarModal();
        }
    });

    return { pantallaCompleta, abrirModal, cerrarModal };
}