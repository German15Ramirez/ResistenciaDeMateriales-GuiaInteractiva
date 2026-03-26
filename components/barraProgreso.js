// components/barraProgreso.js
// Componente de barra de progreso con diseño mejorado

function renderBarraProgreso() {
    return `
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-blue-100 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            📊 Progreso de Estudio
                        </h3>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Mantén tu ritmo de aprendizaje</p>
                    </div>
                </div>
                <div class="text-right">
                    <span id="contadorTemas" class="text-sm font-medium text-gray-600 dark:text-gray-400">0 de 0 temas</span>
                </div>
            </div>
            <div class="relative">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                        id="barraProgreso" 
                        class="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 relative"
                        style="width: 0%"
                    >
                        <div class="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                    </div>
                </div>
                <div class="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <div class="flex items-center gap-1">
                        <span>🏁</span>
                        <span>Inicio</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span id="porcentajeProgreso" class="font-bold text-blue-600 dark:text-blue-400 text-sm">0%</span>
                        <span class="text-gray-400">|</span>
                        <span>🎯 Meta: 100%</span>
                    </div>
                </div>
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