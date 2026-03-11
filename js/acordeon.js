function iniciarAcordeon(){

document.querySelectorAll(".acordeon").forEach((btn,i)=>{

btn.addEventListener("click", async ()=>{

const contenido = document.querySelectorAll(".contenido")[i]
const icono = btn.querySelector(".icono")

contenido.classList.toggle("hidden")

if(contenido.classList.contains("hidden")){
icono.textContent = "+"
}else{

icono.textContent = "-"

// cargar contenido solo la primera vez
if(!contenido.dataset.cargado){

const res = await fetch(`components/unidades/${contenido.id}.html`)
const html = await res.text()

contenido.innerHTML = html
contenido.dataset.cargado = "true"

}

}

})

})

}