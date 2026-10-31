function mostarform() {
    formulario.style.left = "50%";
    formulario.style.transform = "translate(-50%, -50%)";
    mascara.style.visibility = "visible";
}

const formulario = document.querySelector('.formulario');
const mascara = document.querySelector('.marscara-formulario');


function esconderform() {
    formulario.style.left = "-340px";
    formulario.style.transform = "translateY(-50%)";
    mascara.style.visibility = "hidden";
}

const fotos = document.querySelectorAll('.galeria img');

const modal = document.getElementById("modal"); 
const fotoGrande = document.getElementById("fotoGrande"); 
const fechar = document.getElementById("fechar"); 
const anterior = document.getElementById("anterior"); 
const proximo = document.getElementById("proximo");

let indiceAtual = 0;

fotos.forEach((foto, indice) => { 
    foto.addEventListener("click", () => { 
        indiceAtual = indice; 
        abrirFoto(); 
    }); 
});

function abrirFoto() { 
    fotoGrande.src = fotos[indiceAtual].src; 
    modal.style.display = "flex"; 
}

fechar?.addEventListener("click", () => { 
    modal.style.display = "none"; 
});

proximo?.addEventListener("click", () => { 
    indiceAtual++; 
    if (indiceAtual >= fotos.length) { 
        indiceAtual = 0; 
    } 
    abrirFoto();
});

anterior?.addEventListener("click", () => { 
    indiceAtual--;
    if (indiceAtual < 0) { 
        indiceAtual = fotos.length - 1; 
    } 
    abrirFoto();
});

modal?.addEventListener("click", (event) => { 
    if (event.target === modal) { 
        modal.style.display = "none"; 
    } 
});

document.addEventListener("keydown", (event) => { 
    if (modal && modal.style.display === "flex") { 
        if (event.key === "ArrowRight") { 
            proximo.click(); } 
            if (event.key === "ArrowLeft") { 
                anterior.click(); } 
                if (event.key === "Escape") { 
                    fechar.click(); 
                } 
            } 
        });

        