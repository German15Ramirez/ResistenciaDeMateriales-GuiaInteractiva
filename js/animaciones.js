const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";
entry.target.style.transform = "translateY(0)";

}

});

});

document.querySelectorAll(".tema").forEach(tema => {

tema.style.opacity="0";
tema.style.transform="translateY(30px)";
tema.style.transition="all 0.6s";

observer.observe(tema);

});