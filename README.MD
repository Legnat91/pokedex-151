# Pokédex Web

Aplicación web que consume la **PokeAPI** para mostrar una Pokédex interactiva con información básica de cada Pokémon. La aplicación muestra los Pokémon en tarjetas y permite al usuario abrir un **modal** con información más detallada y estadísticas.

El proyecto está desarrollado utilizando **HTML, JavaScript modular y TailwindCSS**, obteniendo los datos de los Pokémon mediante peticiones a una API externa y renderizándolos dinámicamente en el DOM.

---

## Funcionalidades

- Visualización de Pokémon en formato **tarjetas**
- Cada tarjeta muestra:
  - Imagen
  - Número de Pokédex
  - Nombre
  - Tipo o tipos
- **Colores dinámicos** según el tipo del Pokémon
- **Modal interactivo** al hacer clic en una tarjeta
- Visualización de **estadísticas mediante barras**
- **Buscador de Pokémon**
- Diseño **responsive**
- Cierre del modal mediante:
  - botón de cerrar
  - clic fuera del modal
  - tecla **Escape**

---

## Tecnologías utilizadas

- **HTML5**
- **JavaScript (ES Modules)**
- **TailwindCSS**
- **PokeAPI**

---

## Estructura del proyecto
js/
├─ app.js
├─ features/
│ ├─ tarjeta.js
│ └─ buscador.js
├─ service/
│ └─ api.js
├─ shared/
│ └─ colores.js
└─ components/
└─ tarjetaModal.js

---

## API utilizada

Este proyecto utiliza la API pública:

https://pokeapi.co/

para obtener información sobre los Pokémon.

---

## Objetivo del proyecto

El objetivo de este proyecto es practicar:

- Consumo de APIs
- Manipulación del **DOM con JavaScript**
- Organización del código mediante **módulos**
- Creación de interfaces modernas con **TailwindCSS**