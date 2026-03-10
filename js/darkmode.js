const botonModo = document.getElementById("modoBtn")
const switchBtn = document.getElementById("switch")

function activarOscuro(){

document.documentElement.classList.add("dark")
switchBtn.style.transform = "translateX(28px)"
switchBtn.textContent = "☀️"

}

function activarClaro(){

document.documentElement.classList.remove("dark")
switchBtn.style.transform = "translateX(0px)"
switchBtn.textContent = "🌙"

}

// revisar preferencia guardada

if(localStorage.getItem("modo") === "oscuro"){
activarOscuro()
}else{
activarClaro()
}

// evento click

botonModo.addEventListener("click",()=>{

if(document.documentElement.classList.contains("dark")){

activarClaro()
localStorage.setItem("modo","claro")

}else{

activarOscuro()
localStorage.setItem("modo","oscuro")

}

})