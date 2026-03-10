function iniciarDarkMode(){

const botonModo = document.getElementById("modoBtn")
const switchBtn = document.getElementById("switch")

if(!botonModo) return

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

if(localStorage.getItem("modo") === "oscuro"){
activarOscuro()
}else{
activarClaro()
}

botonModo.addEventListener("click",()=>{

if(document.documentElement.classList.contains("dark")){

activarClaro()
localStorage.setItem("modo","claro")

}else{

activarOscuro()
localStorage.setItem("modo","oscuro")

}

})

}