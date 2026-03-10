const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", function(){

let texto = buscador.value.toLowerCase();

let temas = document.querySelectorAll(".tema");

temas.forEach(function(tema){

let titulo = tema.innerText.toLowerCase();

if(titulo.includes(texto)){

tema.style.display = "";

}else{

tema.style.display = "none";

}

});

});