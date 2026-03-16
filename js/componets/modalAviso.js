export function lanzarAvisoGBA(mensaje, callbackConfirmar = null) {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4";
    overlay.id="mensajeAviso";

    // Ventana con el borde y fondo clásico de los diálogos de Pokémon
    overlay.innerHTML = `
        <div class="bg-[#F8F8F8] border-4 border-[#556644] shadow-[4px_4px_0px_#000] max-w-sm w-full p-4 font-mono">
            <div class="border-2 border-[#CCDD99] p-3">
                <p class="text-[#335566] text-sm font-bold uppercase mb-6 tracking-tighter leading-relaxed">
                    ${mensaje}
                </p>
                <div class="flex justify-end gap-4">
                    ${callbackConfirmar ? `
                        <button id="cancelarAviso" class="text-[#CC4433] hover:scale-110 font-bold uppercase text-xs">No</button>
                        <button id="confirmarAviso" class="text-[#335566] hover:scale-110 font-bold uppercase text-xs">Sí</button>
                    ` : `
                        <button id="cerrarAviso" class="text-[#335566] hover:scale-110 font-bold uppercase text-xs">Entendido</button>
                    `}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Lógica de los botones
    if (callbackConfirmar) {
        document.getElementById("confirmarAviso").onclick = () => {
            callbackConfirmar();
            overlay.remove();
        };
        document.getElementById("cancelarAviso").onclick = () => overlay.remove();
    } else {
        document.getElementById("cerrarAviso").onclick = () => overlay.remove();
    }
}