import { obtenerDetallePokemon } from "../service/api.js";
import { lanzarAvisoGBA } from "./modalAviso.js";

let equipoActivo = 1;
const MAX_SLOTS = 6;

export function crearPanelEquipo() {
    const panel = document.createElement("div");
    panel.id = "panel-mochila";
    // Fondo verde amarillento similar a la captura
    panel.className = "fixed inset-0 z-[100] md:relative md:sticky md:top-0 md:self-start md:h-screen bg-[#88AA66] border-l-4 border-[#556644] transition-all duration-300 overflow-hidden w-0 flex flex-col font-mono";

    panel.innerHTML = `
        <div class="bg-[#4488AA] border-2 border-white p-2 mb-4 shadow-[4px_4px_0px_#224455]">
            <h2 class="text-white text-center text-xl font-bold tracking-widest uppercase">Equipo Pokémon</h2>
        </div>
        
        <div class="flex justify-between gap-1 mb-4">
            ${[1, 2, 3].map(n => `
                <button class="slot-btn flex-1 py-1 border-2 border-[#556644] text-xs font-bold transition-all ${equipoActivo === n ? 'bg-[#EEAA44] text-white' : 'bg-[#CCDD99] text-[#556644]'}" data-slot="${n}">
                    EQUIPO ${n}
                </button>
            `).join('')}
        </div>

        <div id="grid-equipo" class="flex flex-col gap-2 overflow-y-auto pr-1">
            ${Array(MAX_SLOTS).fill(0).map((_, i) => `
                <div class="drop-zone h-20 bg-[#66AABB] border-2 border-white rounded-tr-2xl rounded-bl-2xl flex items-center p-2 relative shadow-[2px_2px_0px_#335566]" data-index="${i}">
                    <div class="w-12 h-12 bg-[#CCDD99] rounded-full border border-[#556644] flex items-center justify-center overflow-hidden">
                        <span class="text-[#88AA66] text-2xl">+</span>
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="h-2 w-24 bg-[#335566]/30 rounded"></div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="mt-auto pt-4 flex flex-col gap-2">
            <button id="borrarEquipo" class="bg-[#CC4433] border-2 border-white text-white py-2 text-sm font-bold shadow-[2px_2px_0px_#662211] hover:bg-red-500 active:translate-y-1">
                BORRAR EQUIPO ACTUAL
            </button>
            <button id="cerrarMochila" class="bg-[#556644] border-2 border-white text-white py-2 text-sm font-bold shadow-[2px_2px_0px_#223311]">
                SALIR
            </button>
        </div>
    `;

    document.body.append(panel);
    setupEventListeners();
    renderEquipo();
}

function setupEventListeners() {
    const panel = document.getElementById("panel-mochila");
    const menuMochila = document.getElementById("menuMochila");

    const abrirMochila = () => {
        // En móvil (w-full) ocupa todo. En escritorio (md:w-96) el ancho que definas.
        panel.classList.replace("w-0", "w-full");
        panel.classList.add("md:w-96");

        // En móvil bloqueamos el scroll del fondo para que no se mueva lo de atrás
        if (window.innerWidth < 768) {
            document.body.style.overflow = "hidden";
        }
    };

    const cerrarMochila = () => {
        panel.classList.replace("w-full", "w-0");
        panel.classList.remove("md:w-96");

        // Devolvemos el scroll al cerrar
        document.body.style.overflow = "auto";
    };

    menuMochila.onclick = abrirMochila;
    document.getElementById("cerrarMochila").onclick = cerrarMochila;




    panel.querySelectorAll(".slot-btn").forEach(btn => {
        btn.onclick = () => {
            equipoActivo = parseInt(btn.dataset.slot);
            panel.querySelectorAll(".slot-btn").forEach(b => {
                b.classList.replace('bg-[#EEAA44]', 'bg-[#CCDD99]');
                b.classList.remove('text-white');
            });
            btn.classList.replace('bg-[#CCDD99]', 'bg-[#EEAA44]');
            btn.classList.add('text-white');
            renderEquipo();
        };
    });

    const zones = panel.querySelectorAll(".drop-zone");
    zones.forEach(zone => {
        zone.ondragover = (e) => e.preventDefault();
        zone.ondrop = async (e) => {
            e.preventDefault();
            const pokemonId = e.dataTransfer.getData("text/plain");
            agregarAlEquipo(pokemonId);
        };
    });

    document.getElementById("borrarEquipo").onclick = () => {
        if (confirm(`¿Deseas liberar a todos los Pokémon del Equipo ${equipoActivo}?`)) {
            guardarEquipo([]);
            renderEquipo();
        }
    };
    document.getElementById("borrarEquipo").onclick = () => {
    lanzarAvisoGBA(`¿Quieres liberar a todos los Pokémon del EQUIPO ${equipoActivo}?`, () => {
        guardarEquipo([]);
        renderEquipo();
    });
};
}

async function renderEquipo() {
    const ids = leerEquipo(equipoActivo);
    const zones = document.querySelectorAll(".drop-zone");

    zones.forEach((z, i) => {
        z.innerHTML = `
            <div class="w-12 h-12 bg-[#CCDD99] rounded-full border border-[#556644] flex items-center justify-center overflow-hidden">
                <span class="text-[#88AA66] text-2xl">+</span>
            </div>
            <div class="ml-4 flex-1">
                <p class="text-[#335566] text-xs font-bold">VACÍO</p>
            </div>
        `;
    });

    for (let i = 0; i < ids.length; i++) {
        const poke = await obtenerDetallePokemon(`https://pokeapi.co/api/v2/pokemon/${ids[i]}`);
        const zone = zones[i];

        zone.innerHTML = `
            <div class="w-14 h-14 bg-white/50 rounded-full border-2 border-white flex items-center justify-center overflow-hidden shadow-inner">
                <img src="${poke.sprites.front_default}" class="w-full h-full object-contain">
            </div>
            <div class="ml-3 flex-1">
                <div class="flex justify-between items-start">
                    <p class="text-white text-sm font-bold uppercase tracking-tighter">${poke.name}</p>
                    <p class="text-[#CCDD99] text-[10px]">Nv. 50</p>
                </div>
                <div class="flex items-center gap-1 mt-1">
                    <span class="text-[8px] text-white font-bold">PS</span>
                    <div class="flex-1 h-1.5 bg-[#335566] border border-white rounded-full overflow-hidden">
                        <div class="h-full bg-[#55FF55] w-full"></div>
                    </div>
                </div>
            </div>
            <button class="absolute top-1 right-1 text-white/50 hover:text-red-200 text-xs" onclick="window.quitarDelEquipo(${ids[i]})">✕</button>
        `;
    }
}

// Funciones de persistencia (LocalStorage)
function leerEquipo(n) {
    const todos = JSON.parse(localStorage.getItem("misEquipos")) || { 1: [], 2: [], 3: [] };
    return todos[n] || [];
}

function guardarEquipo(lista) {
    const todos = JSON.parse(localStorage.getItem("misEquipos")) || { 1: [], 2: [], 3: [] };
    todos[equipoActivo] = lista;
    localStorage.setItem("misEquipos", JSON.stringify(todos));
}

function agregarAlEquipo(id) {
    let ids = leerEquipo(equipoActivo);

    if (ids.length >= MAX_SLOTS) {
        lanzarAvisoGBA("¡Tu equipo ya tiene 6 Pokémon! Debes dejar uno antes.");
        return;
    }

    if (ids.includes(parseInt(id))) {
        lanzarAvisoGBA("Ese Pokémon ya está en tu equipo.");
        return;
    }

    ids.push(parseInt(id));
    guardarEquipo(ids);
    renderEquipo();
}

window.quitarDelEquipo = (id) => {
    let ids = leerEquipo(equipoActivo);
    ids = ids.filter(pId => pId !== id);
    guardarEquipo(ids);
    renderEquipo();
};