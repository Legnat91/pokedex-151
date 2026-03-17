

<<<<<<< Updated upstream
=======
export function crearPanelEquipo() {
    const panel = document.createElement("div");
    panel.id = "panel-mochila";
  
    panel.className = "fixed inset-0 z-[100] md:relative md:sticky md:top-0 md:self-start md:h-screen bg-[#88AA66] border-l-4 border-[#556644] transition-all duration-300 overflow-hidden w-0 flex flex-col font-mono";
>>>>>>> Stashed changes

export function crearPanelEquipo(){
    const panel=document.createElement("div");
    panel.className="fixed top-0 rigth-0 w-full md:w-1/3 h-screen bg-green-300 shadow-lg p-6 transalate-x-full  transition-transform"

    const listaEquipo=document.createElement("ul");
    listaEquipo.id="listaEquipo";
    const botonCerrar=document.createElement("button");

    panel.append(listaEquipo,botonCerrar);

    document.body.append(panel);

   

<<<<<<< Updated upstream
=======
    const abrirMochila = () => {
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

    ids.push(parseInt(id));
    guardarEquipo(ids);
    renderEquipo();
}

window.quitarDelEquipo = (id) => {
    let ids = leerEquipo(equipoActivo);
    ids = ids.filter(pId => pId !== id);
    guardarEquipo(ids);
    renderEquipo();
>>>>>>> Stashed changes
};