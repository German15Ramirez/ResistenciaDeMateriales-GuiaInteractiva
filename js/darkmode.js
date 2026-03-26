function iniciarDarkMode() {
  const botonModo = document.getElementById("modoBtn");
  const switchBtn = document.getElementById("switch");

  if (!botonModo) return;

  function activarOscuro() {
    document.documentElement.classList.add("dark");
    if (switchBtn) {
      switchBtn.style.transform = "translateX(28px)";
      switchBtn.textContent = "☀️";
    }
  }

  function activarClaro() {
    document.documentElement.classList.remove("dark");
    if (switchBtn) {
      switchBtn.style.transform = "translateX(0px)";
      switchBtn.textContent = "🌙";
    }
  }

  if (document.documentElement.classList.contains("dark")) {
    if (switchBtn) {
      switchBtn.style.transform = "translateX(28px)";
      switchBtn.textContent = "☀️";
    }
  } else {
    if (switchBtn) {
      switchBtn.style.transform = "translateX(0px)";
      switchBtn.textContent = "🌙";
    }
  }

  if (botonModo._listener) {
    botonModo.removeEventListener("click", botonModo._listener);
  }
  
  const clickHandler = () => {
    if (document.documentElement.classList.contains("dark")) {
      activarClaro();
      localStorage.setItem("modo", "claro");
    } else {
      activarOscuro();
      localStorage.setItem("modo", "oscuro");
    }
  };
  
  botonModo._listener = clickHandler;
  botonModo.addEventListener("click", clickHandler);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarDarkMode);
} else {
  iniciarDarkMode();
}