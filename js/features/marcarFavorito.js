// marcarFavorito.js

// Le pasamos el ID del Pokémon como parámetro
export function crearBotonFavorito(pokemonId) {
    const svgNoFav = `<svg id="noFav" class="w-6 h-6 text-gray-400 drop-shadow-sm" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.04 16.048a9 9 0 0 0 -12.083 -12.09m-2.32 1.678a9 9 0 1 0 12.737 12.719" /><path d="M9.884 9.874a3 3 0 1 0 4.24 4.246m.57 -3.441a3.012 3.012 0 0 0 -1.41 -1.39" /><path d="M3 12h6m7 0h5" /><path d="M3 3l18 18" /></svg>`;
    const svgFav = `<svg id="fav" class="w-6 h-6 text-red-500 drop-shadow-md" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M3 12h6" /><path d="M15 12h6" /></svg>`;

    const botonFav = document.createElement("button");
    botonFav.className = "absolute top-2 left-2 p-1 cursor-pointer transition-transform hover:scale-125 z-10"; 
    
    // Leemos la lista de favoritos
    let favoritosGuardados = JSON.parse(localStorage.getItem('misFavoritos')) || [];
    
    // Usamos el 'pokemonId' que recibimos por parámetro
    let esFavorito = favoritosGuardados.includes(pokemonId); 

    botonFav.innerHTML = esFavorito ? svgFav : svgNoFav;

    botonFav.addEventListener("click", (evento) => {
        evento.stopPropagation(); 
        
        let favoritosActualizados = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        esFavorito = !esFavorito; 

        if (esFavorito) {
            botonFav.innerHTML = svgFav;
            if (!favoritosActualizados.includes(pokemonId)) {
                favoritosActualizados.push(pokemonId);
            }
        } else {
            botonFav.innerHTML = svgNoFav;
            favoritosActualizados = favoritosActualizados.filter(id => id !== pokemonId);
        }
        
        localStorage.setItem('misFavoritos', JSON.stringify(favoritosActualizados));
    });

    // ¡MUY IMPORTANTE! Devolvemos el botón ya configurado
    return botonFav;
}