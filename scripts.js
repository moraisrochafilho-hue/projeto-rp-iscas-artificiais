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

        
// Abas da galeria de vídeos e vídeos enviados pelos pescadores.
(function () {
  const abas = Array.from(document.querySelectorAll('.menu-videos [role="tab"]'));
  if (!abas.length) return;
  function selecionar(aba) {
    abas.forEach(item => {
      const ativa = item === aba;
      item.classList.toggle('ativa', ativa);
      item.setAttribute('aria-selected', String(ativa));
      item.tabIndex = ativa ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !ativa;
    });
  }
  abas.forEach((aba, indice) => {
    aba.addEventListener('click', () => selecionar(aba));
    aba.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const proxima = event.key === 'Home' ? 0 : event.key === 'End' ? abas.length - 1 : (indice + (event.key === 'ArrowRight' ? 1 : -1) + abas.length) % abas.length;
      selecionar(abas[proxima]); abas[proxima].focus();
    });
  });
  // Para adicionar vídeos dos pescadores, edite esta lista.
  // Exemplo: { titulo: 'Pescaria com RP', arquivo: './img/pescaria.mp4' }
  // Ou: { titulo: 'Pescaria no YouTube', youtubeId: 'ID_DO_VIDEO' }
  const videosPescadores = Array.from({length: 17}, (_, i) => ({titulo: `Vídeo enviado pelo pescador ${i + 1}`, arquivo: `./videos_pescadores/video${i + 1}.mp4`, miniatura: `./videos_pescadores/video${i + 1}.jpg`}));
  const galeria = document.getElementById('galeria-pescadores');
  const aviso = document.getElementById('aviso-pescadores');
  const modalVideo = document.getElementById('rp-modal-video');
  const playerVideo = document.getElementById('rp-player-video');
  const tituloVideo = document.getElementById('rp-titulo-video');
  const contadorVideo = document.getElementById('rp-contador-video');
  const fecharVideo = document.getElementById('rp-fechar-video');
  const anteriorVideo = document.getElementById('rp-anterior-video');
  const proximoVideo = document.getElementById('rp-proximo-video');
  let indiceVideo = 0;
  let focoAnterior = null;
  function mostrarVideo(indice) {
    indiceVideo = (indice + videosPescadores.length) % videosPescadores.length;
    const video = videosPescadores[indiceVideo];
    playerVideo.pause();
    playerVideo.src = video.arquivo;
    playerVideo.poster = video.miniatura;
    playerVideo.load();
    tituloVideo.textContent = video.titulo;
    contadorVideo.textContent = `${indiceVideo + 1} de ${videosPescadores.length}`;
    modalVideo.hidden = false;
    document.body.classList.add('rp-modal-aberto');
    fecharVideo.focus();
    playerVideo.play().catch(() => {});
  }
  function fecharModalVideo() {
    playerVideo.pause();
    playerVideo.removeAttribute('src');
    playerVideo.load();
    modalVideo.hidden = true;
    document.body.classList.remove('rp-modal-aberto');
    focoAnterior?.focus();
  }
  videosPescadores.forEach((video, indice) => {
    const cartao = document.createElement('article');
    cartao.className = 'rp-cartao-pescador';
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'rp-abrir-video';
    botao.setAttribute('aria-label', `Assistir ${video.titulo}`);
    const imagem = document.createElement('img');
    imagem.src = video.miniatura;
    imagem.alt = `Prévia: ${video.titulo}`;
    imagem.loading = 'lazy';
    const icone = document.createElement('span');
    icone.className = 'rp-icone-play';
    icone.textContent = '▶';
    const titulo = document.createElement('h3');
    titulo.textContent = video.titulo;
    botao.append(imagem, icone);
    botao.addEventListener('click', () => { focoAnterior = botao; mostrarVideo(indice); });
    cartao.append(botao, titulo);
    galeria.append(cartao);
  });
  if (aviso) aviso.hidden = videosPescadores.length > 0;
  fecharVideo.addEventListener('click', fecharModalVideo);
  anteriorVideo.addEventListener('click', () => mostrarVideo(indiceVideo - 1));
  proximoVideo.addEventListener('click', () => mostrarVideo(indiceVideo + 1));
  modalVideo.addEventListener('click', e => { if (e.target === modalVideo) fecharModalVideo(); });
  document.addEventListener('keydown', e => {
    if (modalVideo.hidden) return;
    if (e.key === 'Escape') fecharModalVideo();
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostrarVideo(indiceVideo - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); mostrarVideo(indiceVideo + 1); }
    if (e.key === 'Tab') {
      const itens = [fecharVideo, anteriorVideo, playerVideo, proximoVideo];
      const atual = itens.indexOf(document.activeElement);
      if (e.shiftKey && atual === 0) {e.preventDefault(); proximoVideo.focus();}
      if (!e.shiftKey && atual === itens.length - 1) {e.preventDefault(); fecharVideo.focus();}
    }
  });
})();
