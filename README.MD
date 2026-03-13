# Pokédex Web App - Proyecto DAW

Una aplicación web interactiva que simula una Pokédex, desarrollada como proyecto para 2º de DAW. Esta aplicación consume la [PokeAPI](https://pokeapi.co/) para mostrar información detallada de los 151 Pokémon originales (Primera Generación).

## Funcionalidades Destacadas

* **Paginación y Scroll Infinito:** Carga dinámica de los Pokémon de 20 en 20 utilizando la API `IntersectionObserver`, mejorando el rendimiento inicial de la página.
* **Filtros Avanzados y Combinados:** * Buscador por nombre en tiempo real.
    * Filtro multi-tipo (permite seleccionar varios tipos simultáneamente).
    * Los filtros consultan directamente a la API para asegurar un rendimiento óptimo sin sobrecargar el DOM.
* **Sistema de Favoritos:** Posibilidad de marcar Pokémon como favoritos. El estado se guarda en el `localStorage` del navegador y se sincroniza en tiempo real en toda la interfaz.
* **Vista Detallada (Modal):** Al hacer clic en una tarjeta, se abre una ventana modal con:
    * Estadísticas base con barras de progreso.
    * Tipos y número de la Pokédex.
    * **Cadena de evoluciones dinámica**, calculada mediante funciones recursivas para soportar evoluciones ramificadas (ej. Eevee).
* **UX/UI Cuidada:** Efectos de carga (*Skeleton Loading*) mediante promesas falsas para suavizar la transición de red y diseño *responsive* con Tailwind CSS.

## 🛠️ Tecnologías Utilizadas

* **HTML5**
* **Tailwind CSS** (vía CDN para prototipado rápido)
* **JavaScript (ES6+)**:
    * Arquitectura basada en **Módulos** (`import` / `export`).
    * Manejo de asincronía avanzada (`async / await`, `Promise.all`).
    * Manipulación dinámica del DOM.
* **PokeAPI v2** como fuente de datos.

## 📁 Estructura del Proyecto

El código está estructurado de forma modular para separar responsabilidades y facilitar el mantenimiento:

```text
 pokedex
 ┣ 📂 fonts         # Fuentes personalizadas (pokemon.ttf)
 ┣ 📂 img           # Recursos gráficos e iconos
 ┣ 📂 js
 ┃ ┣ 📂 components  # Renderizado de la interfaz (tarjetas, modales, skeletons)
 ┃ ┣ 📂 features    # Lógica de negocio (buscador, filtros, favoritos, scroll)
 ┃ ┣ 📂 service     # Centralización de las peticiones HTTP a la PokeAPI
 ┃ ┗ 📂 shared      # Variables y utilidades globales (colores de Tailwind)
 ┃ ┗ 📜 app.js      # Punto de entrada principal e inicialización
 ┣ 📂 style         # Archivos CSS personalizados y animaciones
 ┗ 📜 index.html    # Estructura principal de la aplicación

Cómo ejecutar el proyecto
Al ser un proyecto basado en Vanilla JavaScript con módulos de ES6, necesitas ejecutarlo a través de un servidor local para evitar problemas de CORS.

Clona o descarga este repositorio.

Abre la carpeta en tu editor de código (ej. Visual Studio Code).

Inicia un servidor local. Si usas VS Code, la extensión Live Server es la opción más rápida:

Haz clic derecho sobre index.html.

Selecciona "Open with Live Server".

¡Disfruta de la Pokédex en tu navegador!