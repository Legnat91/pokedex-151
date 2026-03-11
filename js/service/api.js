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