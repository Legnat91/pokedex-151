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
        // Buscamos la especie para conseguir la URL de la cadena
        const resEspecie = await fetch(urlEspecie);
        const dataEspecie = await resEspecie.json();

        //  Buscamos la cadena de evolución completa
        const resEvolucion = await fetch(dataEspecie.evolution_chain.url);
        const dataEvolucion = await resEvolucion.json();

        const cadena = [];

        // Creamos una función recursiva
        function extraerDatosEvolucion(nodo) {
            // Extraemos los datos del Pokémon actual
            const nombre = nodo.species.name;
            const urlParts = nodo.species.url.split("/");
            const id = urlParts[urlParts.length - 2];
            const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

            // Lo metemos en nuestro array
            cadena.push({ nombre, imagen });

            // Si este Pokémon tiene evoluciones, recorremos TODAS (no solo la [0])
            if (nodo.evolves_to && nodo.evolves_to.length > 0) {
                nodo.evolves_to.forEach(siguienteEvolucion => {
                    // La función se llama a sí misma por cada rama que exista
                    extraerDatosEvolucion(siguienteEvolucion);
                });
            }
        }

        // Iniciamos la recursividad pasándole la base del árbol (el primer Pokémon)
        extraerDatosEvolucion(dataEvolucion.chain);

        return cadena;

    } catch (error) {
        console.error("Error obteniendo evoluciones:", error);
        return [];
    }
}
export async function obtenerListaMaestra(tiposSeleccionados) {
    let listaCombinada = [];

    if (tiposSeleccionados.length === 0) {
        // Si no hay filtros, traemos los 151 originales
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`);
        const data = await res.json();
        listaCombinada = data.results;
    } else {
        // Si hay tipos, pedimos todos los tipos a la vez con Promise.all
        const promesas = tiposSeleccionados.map(tipo => 
            fetch(`https://pokeapi.co/api/v2/type/${tipo}`).then(r => r.json())
        );
        const resultados = await Promise.all(promesas);

        resultados.forEach(tipoData => {
            // La API de tipos anida los datos un poco diferente
            const pokemons = tipoData.pokemon.map(p => p.pokemon);
            listaCombinada = listaCombinada.concat(pokemons);
        });
    }

    // Filtramos para que solo sean los 151 primeros y quitamos duplicados
    const listaUnica = [];
    const nombresVistos = new Set();

    for (const p of listaCombinada) {
        // Sacamos el ID de la URL (ej: "https://pokeapi.co/api/v2/pokemon/6/" -> 6)
        const id = parseInt(p.url.split('/').filter(Boolean).pop());
        
        if (id <= 151 && !nombresVistos.has(p.name)) {
            nombresVistos.add(p.name);
            listaUnica.push(p);
        }
    }

    return listaUnica; // Devuelve un array limpio de { name, url }
}
