const temas = [
{titulo:"Introducción", archivo:"introduccion.html"},
{titulo:"Conceptos básicos", archivo:"conceptos.html"},
{titulo:"Esfuerzo", archivo:"esfuerzo.html"},
{titulo:"Deformación", archivo:"deformacion.html"},
{titulo:"Relación esfuerzo-deformación", archivo:"relacion.html"},
{titulo:"Carga axial", archivo:"carga-axial.html"},
{titulo:"Esfuerzo cortante", archivo:"cortante.html"},
{titulo:"Torsión", archivo:"torsion.html"},
{titulo:"Flexión", archivo:"flexion.html"},
{titulo:"Momento flector", archivo:"momento.html"},
{titulo:"Diagramas de esfuerzo", archivo:"diagramas.html"},
{titulo:"Vigas", archivo:"vigas.html"},
{titulo:"Columnas", archivo:"columnas.html"},
{titulo:"Pandeo", archivo:"pandeo.html"},
{titulo:"Energía de deformación", archivo:"energia.html"},
{titulo:"Trabajo y energía", archivo:"trabajo.html"},
{titulo:"Deflexión en vigas", archivo:"deflexion.html"},
{titulo:"Método de superposición", archivo:"superposicion.html"},
{titulo:"Círculo de Mohr", archivo:"mohr.html"},
{titulo:"Esfuerzos principales", archivo:"principales.html"},
{titulo:"Cortante máximo", archivo:"cortante-max.html"},
{titulo:"Fatiga", archivo:"fatiga.html"},
{titulo:"Fractura", archivo:"fractura.html"},
{titulo:"Aplicaciones", archivo:"aplicaciones.html"}
];

const contenedor = document.getElementById("tarjetas");

temas.forEach(tema => {

const tarjeta = document.createElement("div");

tarjeta.className = `
bg-white dark:bg-gray-800
shadow-lg
rounded-xl
p-6
flex flex-col
justify-between
hover:scale-105
transition
`;

tarjeta.innerHTML = `
<h3 class="text-xl font-bold mb-3">${tema.titulo}</h3>

<p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
Explora el contenido interactivo de este tema de Resistencia de Materiales.
</p>

<a href="temas/${tema.archivo}"
class="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition">
Ver tema
</a>
`;

contenedor.appendChild(tarjeta);

});