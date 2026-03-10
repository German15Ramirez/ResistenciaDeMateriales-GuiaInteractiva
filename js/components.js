function cargarComponente(id, archivo){

fetch(archivo)
.then(res => res.text())
.then(data => {

document.getElementById(id).innerHTML = data;

});

}

cargarComponente("navbar","components/navbar.html");
cargarComponente("hero","components/hero.html");
cargarComponente("tarjetas","components/tarjetas.html");
cargarComponente("footer","components/footer.html");