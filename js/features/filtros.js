let textoBusqueda = "";
let tipoSeleccionado = "todos";

export function setTextoBusqueda(texto) {
    textoBusqueda = texto.toLowerCase().trim();
    aplicarFiltros();
}

export function setTipoSeleccionado(tipo) {
    tipoSeleccionado = tipo;
    aplicarFiltros();
}

export function aplicarFiltros() {
    const tarjetas = document.querySelectorAll("#lista-pokemon li");

    tarjetas.forEach((tarjeta) => {
        const nombre = tarjeta.dataset.nombre;
        const tipos = tarjeta.dataset.tipo;

        const coincideBusqueda =
            textoBusqueda === "" || nombre.includes(textoBusqueda);

        const coincideTipo =
            tipoSeleccionado === "todos" || tipos.includes(tipoSeleccionado);

        if (coincideBusqueda && coincideTipo) {
            tarjeta.style.display = "flex";
        } else {
            tarjeta.style.display = "none";
        }
    });
}