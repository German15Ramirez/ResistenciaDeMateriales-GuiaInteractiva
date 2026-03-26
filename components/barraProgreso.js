// components/barraProgreso.js
// Componente de barra de progreso

function renderBarraProgreso() {
    return `
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
            <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    📊 Progreso de estudio
                </h3>
                <span id="porcentajeProgreso" class="text-xs text-gray-500 dark:text-gray-400">
                    0% completado
                </span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div 
                    id="barraProgreso" 
                    class="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style="width: 0%"
                ></div>
            </div>
            <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>🏁 Inicio</span>
                <span>🎯 Meta: todos los temas</span>
            </div>
        </div>
    `;
}

// Función para insertar la barra de progreso en un contenedor
function insertarBarraProgreso(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        contenedor.innerHTML = renderBarraProgreso();
        
        // Actualizar la barra después de insertarla
        if (typeof actualizarBarraProgreso === 'function') {
            setTimeout(() => actualizarBarraProgreso(), 100);
        }
    }
}

// Exportar para uso global
window.barraProgreso = {
    render: renderBarraProgreso,
    insertar: insertarBarraProgreso
};