export async function obtenerPokeApi() {
    const urlApi = "https://pokeapi.co/api/v2/pokemon?limit=151";

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