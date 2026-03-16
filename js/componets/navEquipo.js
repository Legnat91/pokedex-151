


export function crearPanelEquipo(){
    const panel=document.createElement("div");
    panel.className="fixed top-0 rigth-0 w-full md:w-1/3 h-screen bg-green-300 shadow-lg p-6 transalate-x-full  transition-transform"

    const listaEquipo=document.createElement("ul");
    listaEquipo.id="listaEquipo";
    const botonCerrar=document.createElement("button");

    panel.append(listaEquipo,botonCerrar);

    document.body.append(panel);

   

};