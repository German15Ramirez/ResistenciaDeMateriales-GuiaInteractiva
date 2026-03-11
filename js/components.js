async function cargarComponente(id, archivo){

const res = await fetch(archivo)
const html = await res.text()

document.getElementById(id).innerHTML = html

}

async function iniciarComponentes(){

await cargarComponente("navbar","components/navbar.html")
await cargarComponente("hero","components/hero.html")
await cargarComponente("tarjetas","components/tarjetas.html")
await cargarComponente("footer","components/footer.html")

// iniciar scripts cuando ya existen los elementos
iniciarDarkMode()
iniciarAcordeon()
iniciarBuscador()

}

iniciarComponentes()