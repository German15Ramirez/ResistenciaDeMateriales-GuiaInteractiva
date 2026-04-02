function obtenerListaTemas() {
    const temasElements = document.querySelectorAll('.tema');
    const temas = [];
    
    temasElements.forEach((tema) => {
        const link = tema.querySelector('a');
        if (link) {
            let temaId = link.getAttribute('href');
            if (temaId.includes('/')) {
                temaId = temaId.split('/').pop();
            }
            temaId = temaId.replace('.html', '');
            temas.push(temaId);
        }
    });
    
    return temas;
}

function getTemasCompletados() {
    const completados = localStorage.getItem('temasCompletados');
    return completados ? JSON.parse(completados) : [];
}

function setTemasCompletados(completados) {
    localStorage.setItem('temasCompletados', JSON.stringify(completados));
}

function isTemaCompletado(temaId) {
    const completados = getTemasCompletados();
    return completados.includes(temaId);
}

function mostrarNotificacion(mensaje, tipo = 'exito') {
    const notificacion = document.createElement('div');
    
    const bgColor = tipo === 'exito' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-blue-600';
    const icono = tipo === 'exito' ? '🎉' : '📚';
    const titulo = tipo === 'exito' ? '¡Excelente!' : 'Información';
    
    notificacion.className = `fixed top-24 right-4 z-50 rounded-xl shadow-2xl transform transition-all duration-500 translate-x-full overflow-hidden`;
    notificacion.innerHTML = `
        <div class="${bgColor} text-white px-5 py-4 min-w-[280px] max-w-sm">
            <div class="flex items-start gap-3">
                <div class="text-2xl animate-bounce">${icono}</div>
                <div class="flex-1">
                    <p class="font-bold text-sm uppercase tracking-wider">${titulo}</p>
                    <p class="text-sm font-medium">${mensaje}</p>
                </div>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white/70 hover:text-white transition text-lg leading-none">&times;</button>
            </div>
            <div class="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
                <div class="h-full bg-white rounded-full animate-progress-shrink" style="width: 100%; animation: shrink 3s linear forwards;"></div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
        }
        .animate-progress-shrink {
            animation: shrink 3s linear forwards;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 10);
    
    // Animar salida
    setTimeout(() => {
        notificacion.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notificacion.remove();
            style.remove();
        }, 500);
    }, 3300);
}

function mostrarMensajeCompletado() {
    const temas = obtenerListaTemas();
    const completados = getTemasCompletados();
    const completadosEnLista = completados.filter(c => temas.includes(c));
    const porcentaje = (completadosEnLista.length / temas.length) * 100;
    
    if (porcentaje === 100 && temas.length > 0) {
        const yaMostrado = localStorage.getItem('felicitacionMostrada');
        
        if (!yaMostrado) {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300';
            modal.innerHTML = `
                <div class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl transform scale-95 animate-scale-in">
                    <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-center">
                        <div class="text-6xl mb-2 animate-bounce">🏆</div>
                        <h2 class="text-2xl font-bold text-white">¡Felicidades!</h2>
                        <p class="text-white/90 text-sm">Has completado todos los temas</p>
                    </div>
                    <div class="p-6 text-center">
                        <div class="mb-4">
                            <div class="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            ¡Excelente trabajo! Has dominado todos los temas.
                        </p>
                        <button onclick="this.closest('.fixed').remove()" class="bg-blue-900 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-semibold shadow-md">
                            Continuar
                        </button>
                    </div>
                </div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(modal);
            
            crearConfeti();
            
            localStorage.setItem('felicitacionMostrada', 'true');
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    } else {
        localStorage.removeItem('felicitacionMostrada');
    }
}

function crearConfeti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#ff66cc'];
    
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'fixed pointer-events-none z-[101]';
        confeti.style.width = `${Math.random() * 10 + 5}px`;
        confeti.style.height = `${Math.random() * 10 + 5}px`;
        confeti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confeti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confeti.style.position = 'fixed';
        confeti.style.top = '-20px';
        confeti.style.left = `${Math.random() * window.innerWidth}px`;
        confeti.style.opacity = '0.8';
        confeti.style.zIndex = '1001';
        
        document.body.appendChild(confeti);
        
        const animation = confeti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.8 },
            { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)',
            fill: 'forwards'
        });
        
        animation.onfinish = () => confeti.remove();
    }
}

function toggleCompletado(temaId) {
    if (!temaId) {
        console.error('No se proporcionó ID del tema');
        return;
    }
    
    let completados = getTemasCompletados();
    let isCompletando = false;
    
    if (completados.includes(temaId)) {
        completados = completados.filter(t => t !== temaId);
        mostrarNotificacion(`❌ Tema desmarcado: ${temaId}`, 'info');
    } else {
        completados.push(temaId);
        isCompletando = true;
        mostrarNotificacion(`¡Felicidades! Has completado el tema "${temaId}"`, 'exito');
    }
    
    setTemasCompletados(completados);
    
    const btn = document.getElementById('btnCompletado');
    if (btn) {
        actualizarBotonEnPagina(temaId);
    }
    
    if (document.getElementById('barraProgreso')) {
        actualizarBarraProgreso();
    }

    if (document.querySelector('.tema')) {
        actualizarEstadosTarjetas();
    }
    
    window.dispatchEvent(new CustomEvent('progresoActualizado', {
        detail: { temaId, completado: isCompletando }
    }));
    
    setTimeout(() => {
        mostrarMensajeCompletado();
    }, 500);
}

function actualizarBotonEnPagina(temaId) {
    const btn = document.getElementById('btnCompletado');
    if (!btn) return;
    
    if (isTemaCompletado(temaId)) {
        btn.textContent = '✅ Completado';
        btn.classList.remove('bg-green-600', 'hover:bg-green-700');
        btn.classList.add('bg-gray-700', 'hover:bg-gray-800');
    } else {
        btn.textContent = '📚 Marcar como completado';
        btn.classList.remove('bg-gray-700', 'hover:bg-gray-800');
        btn.classList.add('bg-green-600', 'hover:bg-green-700');
    }
}

function actualizarEstadosTarjetas() {
    const temasElements = document.querySelectorAll('.tema');
    const completados = getTemasCompletados();
    
    temasElements.forEach((tema) => {
        const link = tema.querySelector('a');
        
        if (link) {
            let temaId = link.getAttribute('href');
            if (temaId.includes('/')) {
                temaId = temaId.split('/').pop();
            }
            temaId = temaId.replace('.html', '');
            temaId = decodeURIComponent(temaId);
            
            let estadoSpan = tema.querySelector('.estado-tema');
            if (!estadoSpan) {
                estadoSpan = document.createElement('p');
                estadoSpan.className = 'estado-tema text-xs mb-2 mt-1 font-medium';
                const titulo = tema.querySelector('h3');
                if (titulo) {
                    titulo.insertAdjacentElement('afterend', estadoSpan);
                } else {
                    tema.insertBefore(estadoSpan, link);
                }
            }
            
            const estaCompletado = completados.includes(temaId);
            
            if (estaCompletado) {
                estadoSpan.innerHTML = '✓ Completado';
                estadoSpan.classList.add('text-green-500');
                estadoSpan.classList.remove('text-gray-500');
                tema.classList.add('border-l-4', 'border-green-500');
                if (!tema.querySelector('.completado-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'completado-badge absolute top-2 right-2 text-green-500 text-xs';
                    badge.innerHTML = '✓';
                    tema.style.position = 'relative';
                    tema.appendChild(badge);
                }
            } else {
                estadoSpan.innerHTML = '○ Pendiente';
                estadoSpan.classList.add('text-gray-500');
                estadoSpan.classList.remove('text-green-500');
                tema.classList.remove('border-l-4', 'border-green-500');
                const badge = tema.querySelector('.completado-badge');
                if (badge) badge.remove();
            }
        }
    });
}

function calcularProgreso() {
    const temas = obtenerListaTemas();
    const completados = getTemasCompletados();
    
    if (temas.length === 0) return 0;
    
    const completadosEnLista = completados.filter(c => temas.includes(c));
    return (completadosEnLista.length / temas.length) * 100;
}

function actualizarBarraProgreso() {
    const barraProgreso = document.getElementById('barraProgreso');
    const porcentajeTexto = document.getElementById('porcentajeProgreso');
    const contadorTexto = document.getElementById('contadorTemas');
    
    if (!barraProgreso) return;
    
    const temas = obtenerListaTemas();
    const completados = getTemasCompletados();
    const completadosEnLista = completados.filter(c => temas.includes(c));
    const porcentaje = (completadosEnLista.length / temas.length) * 100;
    
    barraProgreso.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    barraProgreso.style.width = `${porcentaje}%`;
    
    if (porcentajeTexto) {
        porcentajeTexto.textContent = `${Math.round(porcentaje)}%`;
    }
    
    if (contadorTexto) {
        contadorTexto.textContent = `${completadosEnLista.length} de ${temas.length} temas`;
    }
    
    if (porcentaje === 100) {
        barraProgreso.classList.remove('bg-green-500', 'bg-blue-500');
        barraProgreso.classList.add('bg-gradient-to-r', 'from-green-500', 'to-green-600');
    } else if (porcentaje >= 75) {
        barraProgreso.classList.remove('bg-green-500', 'bg-blue-500', 'bg-gradient-to-r');
        barraProgreso.classList.add('bg-gradient-to-r', 'from-green-400', 'to-green-500');
    } else if (porcentaje >= 50) {
        barraProgreso.classList.remove('bg-green-500', 'bg-blue-500', 'bg-gradient-to-r');
        barraProgreso.classList.add('bg-gradient-to-r', 'from-blue-400', 'to-blue-500');
    } else if (porcentaje >= 25) {
        barraProgreso.classList.remove('bg-green-500', 'bg-blue-500', 'bg-gradient-to-r');
        barraProgreso.classList.add('bg-gradient-to-r', 'from-yellow-400', 'to-yellow-500');
    } else {
        barraProgreso.classList.remove('bg-gradient-to-r', 'from-green-400', 'from-blue-400', 'from-yellow-400');
        barraProgreso.classList.add('bg-gray-500');
    }
    
    if (porcentaje === 100 && temas.length > 0) {
        const mensajeCompleto = document.getElementById('mensajeCompleto');
        if (!mensajeCompleto) {
            const mensaje = document.createElement('div');
            mensaje.id = 'mensajeCompleto';
            mensaje.className = 'mt-3 text-center font-bold animate-pulse';
            mensaje.innerHTML = `
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <span class="text-green-700 dark:text-green-400">¡Felicidades! Has completado todos los temas</span>
                </div>
            `;
            barraProgreso.parentElement.parentElement.appendChild(mensaje);
        }
    } else {
        const mensajeCompleto = document.getElementById('mensajeCompleto');
        if (mensajeCompleto) mensajeCompleto.remove();
    }
}

function initProgreso() {
    setTimeout(() => {
        actualizarEstadosTarjetas();
        actualizarBarraProgreso();
        mostrarMensajeCompletado();
    }, 200);
}

window.progreso = {
    toggleCompletado,
    isTemaCompletado,
    getTemasCompletados,
    calcularProgreso,
    actualizarBarraProgreso,
    actualizarEstadosTarjetas
};

window.toggleCompletado = toggleCompletado;
window.actualizarEstadosTarjetas = actualizarEstadosTarjetas;
window.initProgreso = initProgreso;
window.actualizarBarraProgreso = actualizarBarraProgreso;

function debugProgreso() {
    console.log('=== DEBUG PROGRESO ===');
    const temasElements = document.querySelectorAll('.tema');
    const temasEncontrados = [];
    temasElements.forEach((tema) => {
        const link = tema.querySelector('a');
        if (link) {
            let temaId = link.getAttribute('href');
            if (temaId.includes('/')) {
                temaId = temaId.split('/').pop();
            }
            temaId = temaId.replace('.html', '');
            temaId = decodeURIComponent(temaId);
            temasEncontrados.push(temaId);
            console.log('Tema encontrado:', `"${temaId}"`);
        }
    });
    
    const completados = getTemasCompletados();
    console.log('Temas completados en localStorage:', completados.map(c => `"${c}"`));
    
    console.log('Coincidencias:');
    temasEncontrados.forEach(tema => {
        const estaCompletado = completados.includes(tema);
        console.log(`  "${tema}": ${estaCompletado ? '✓ Completado' : '○ Pendiente'}`);
    });
    
    console.log('=====================');
}

window.debugProgreso = debugProgreso;