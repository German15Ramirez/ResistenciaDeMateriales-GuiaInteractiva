async function cargarComponente(id, archivo) {
    const res = await fetch(archivo);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
}

async function cargarUnidad(id, url) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.innerHTML = html;
            if (typeof window.actualizarEstadosTarjetas === 'function') {
                setTimeout(() => window.actualizarEstadosTarjetas(), 100);
            }
        }
    } catch (error) {
        console.error(`Error cargando ${url}:`, error);
    }
}

async function cargarContenidoUnidades() {
    await cargarUnidad("unidad1", "components/unidades/unidad1.html");
    await cargarUnidad("unidad2", "components/unidades/unidad2.html");
    await cargarUnidad("unidad3", "components/unidades/unidad3.html");
    await cargarUnidad("unidad4", "components/unidades/unidad4.html");
    await cargarUnidad("unidad5", "components/unidades/unidad5.html");
    
    console.log('Todas las unidades cargadas');
    
    setTimeout(() => {
        if (typeof window.actualizarEstadosTarjetas === 'function') {
            console.log('Actualización final después de cargar todas las unidades');
            window.actualizarEstadosTarjetas();
        }
        if (typeof window.actualizarBarraProgreso === 'function') {
            window.actualizarBarraProgreso();
        }
    }, 300);
}

async function iniciarComponentes() {
    console.log('Iniciando componentes...');
    await cargarComponente("navbar", "components/navbar.html");
    await cargarComponente("hero", "components/hero.html");
    await cargarComponente("tarjetas", "components/tarjetas.html");
    await cargarComponente("footer", "components/footer.html");
    
    console.log('Componentes principales cargados');
    
    setTimeout(async () => {
        await cargarContenidoUnidades();
        if (typeof iniciarDarkMode === 'function') {
            iniciarDarkMode();
        }
        
        if (typeof iniciarAcordeon === 'function') {
            iniciarAcordeon();
        }
        
        if (typeof iniciarBuscador === 'function') {
            iniciarBuscador();
        }
        const botonesAcordeon = document.querySelectorAll('.acordeon');
        botonesAcordeon.forEach(boton => {
            boton.addEventListener('click', function() {
                setTimeout(() => {
                    if (typeof window.actualizarEstadosTarjetas === 'function') {
                        window.actualizarEstadosTarjetas();
                    }
                }, 150);
            });
        });
        
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarComponentes);
} else {
    iniciarComponentes();
}