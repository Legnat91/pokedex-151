export async function obtenerPokeApi(limit = 20, offset = 0) {
    const urlApi = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const respuestaDatos = await fetch(urlApi);

        if (!respuestaDatos.ok) {
            throw new Error("ERROR: No se ha podido conectar a la API");
        }

        return await respuestaDatos.json();

    } catch (error) {
        console.error(error);
    }
}

export async function obtenerDetallePokemon(url) {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("ERROR: No se pudo obtener el detalle del Pokémon");
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error);
    }
}

export async function buscarPokemon(nombre) {

    const urlApi = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    try {

        const respuesta = await fetch(urlApi);

        if (!respuesta.ok) {
            throw new Error("Pokemon no encontrado");
        }

        return await respuesta.json();

    } catch (error) {
        console.error(error);
        return null;
    }

}
export async function obtenerEvoluciones(urlEspecie) {
    try {
        // Buscamos la especie para conseguir la URL de la cadena de evolución
        const resEspecie = await fetch(urlEspecie);
        const dataEspecie = await resEspecie.json();

        //  Buscamos la cadena de evolución
        const resEvolucion = await fetch(dataEspecie.evolution_chain.url);
        const dataEvolucion = await resEvolucion.json();

        //  Extraemos las evoluciones del JSON
        const cadena = [];
        let actual = dataEvolucion.chain;

        // Recorremos la cadena mientras haya evoluciones
        do {
            const nombre = actual.species.name;
            
            const urlParts = actual.species.url.split("/");
            const id = urlParts[urlParts.length - 2];
            const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            cadena.push({ nombre, imagen });

            
            actual = actual.evolves_to[0]; 
        } while (actual && actual.hasOwnProperty('evolves_to'));

        return cadena;

    } catch (error) {
        console.error("Error obteniendo evoluciones:", error);
        return [];
    }
}