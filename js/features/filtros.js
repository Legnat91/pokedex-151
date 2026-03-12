let textoBusqueda = "";
let tipoSeleccionado = "todos";
let mostrarFavoritos = false; 

export function setTextoBusqueda(texto) {
    textoBusqueda = texto.toLowerCase().trim();
    aplicarFiltros();
}

export function setTipoSeleccionado(tipo) {
    tipoSeleccionado = tipo;
    aplicarFiltros();
}

export function modoFiltroFavorito(activo) {
    mostrarFavoritos = activo; 
    aplicarFiltros();
}

export function aplicarFiltros() {
    const tarjetas = document.querySelectorAll("#lista-pokemon li");
    const favoritosActuales = JSON.parse(localStorage.getItem('misFavoritos')) || [];

    tarjetas.forEach((tarjeta) => {
        const nombre = tarjeta.dataset.nombre;
        const tipos = tarjeta.dataset.tipo;
        const id = parseInt(tarjeta.dataset.id);

        const coincideBusqueda =
            textoBusqueda === "" || nombre.includes(textoBusqueda);

        const coincideTipo =
            tipoSeleccionado === "todos" || tipos.includes(tipoSeleccionado);

        const esFavorito = favoritosActuales.includes(id);
        
        
        const coincideFavorito = !mostrarFavoritos || esFavorito;

        if (coincideBusqueda && coincideTipo && coincideFavorito) {
            tarjeta.style.display = "flex";
        } else {
            tarjeta.style.display = "none";
        }
    });
}