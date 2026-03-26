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
    notificacion.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full ${
        tipo === 'exito' ? 'bg-green-500' : 'bg-blue-500'
    } text-white font-medium`;
    notificacion.innerHTML = `
        <div class="flex items-center gap-2">
            <span>${tipo === 'exito' ? '✅' : '📚'}</span>
            <span>${mensaje}</span>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notificacion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
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
        mostrarNotificacion(`🎉 ¡Felicidades! Has completado el tema ${temaId} 🎉`, 'exito');
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
    
    barraProgreso.style.width = `${porcentaje}%`;
    
    if (porcentajeTexto) {
        porcentajeTexto.textContent = `${Math.round(porcentaje)}%`;
    }
    
    if (contadorTexto) {
        contadorTexto.textContent = `${completadosEnLista.length} de ${temas.length} temas`;
    }
    
    if (porcentaje === 100) {
        barraProgreso.classList.remove('bg-green-500', 'bg-blue-500');
        barraProgreso.classList.add('bg-green-600');
    } else if (porcentaje >= 50) {
        barraProgreso.classList.remove('bg-green-500', 'bg-green-600');
        barraProgreso.classList.add('bg-blue-500');
    } else {
        barraProgreso.classList.remove('bg-blue-500', 'bg-green-600');
        barraProgreso.classList.add('bg-green-500');
    }
    
    if (porcentaje === 100 && temas.length > 0) {
        const mensajeCompleto = document.getElementById('mensajeCompleto');
        if (!mensajeCompleto) {
            const mensaje = document.createElement('div');
            mensaje.id = 'mensajeCompleto';
            mensaje.className = 'mt-3 text-center text-green-500 font-bold animate-pulse';
            mensaje.innerHTML = '🎉 ¡Felicidades! Has completado todos los temas 🎉';
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

