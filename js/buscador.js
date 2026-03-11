function iniciarBuscador(){

const buscador = document.getElementById("buscador")

if(!buscador) return

buscador.addEventListener("input", ()=>{

const texto = buscador.value.toLowerCase()
const temas = document.querySelectorAll(".tema")

temas.forEach(tema=>{

const titulo = tema.textContent.toLowerCase()

if(titulo.includes(texto)){
tema.style.display = "block"
}else{
tema.style.display = "none"
}

})

})

}