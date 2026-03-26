function iniciarAcordeon() {
    const botones = document.querySelectorAll('.acordeon');
    
    if (!botones.length) return;
    
    botones.forEach(boton => {
        if (boton._acordeonListener) {
            boton.removeEventListener('click', boton._acordeonListener);
        }
        
        const contenido = boton.nextElementSibling;
        const icono = boton.querySelector('.icono');
        
        if (contenido && !contenido.classList.contains('contenido')) {
            contenido.classList.add('contenido');
        }
        
        const toggleAcordeon = (e) => {
            e.preventDefault();
            
            if (boton._animating) return;
            boton._animating = true;
            
            const isActive = boton.classList.contains('active');
            
            
            if (!isActive) {
                boton.classList.add('active');
                if (contenido) {
                    contenido.classList.remove('hidden');
                    void contenido.offsetHeight;
                }
                if (icono) {
                    icono.style.transform = 'rotate(45deg)';
                }
            } else {
                boton.classList.remove('active');
                if (contenido) {
                    contenido.classList.add('hidden');
                }
                if (icono) {
                    icono.style.transform = 'rotate(0deg)';
                }
            }
            
            setTimeout(() => {
                boton._animating = false;
            }, 300);
        };
        
        boton._acordeonListener = toggleAcordeon;
        boton.addEventListener('click', toggleAcordeon);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarAcordeon);
} else {
    iniciarAcordeon();
}