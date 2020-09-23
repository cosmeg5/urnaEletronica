let seuVotoPara = document.querySelector('.header-left-t1 span');
let cargo = document.querySelector('.header-left-t2 span');
let descricao = document.querySelector('.header-left-info');
let aviso = document.querySelector('.footer');
let lateral = document.querySelector('.header-right');
let numeros = document.querySelector('.header-left-num');

let etapaAtual = 0;
let numero = "";
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = "";
    numero = "";
    votoBranco = false;
    numeros.style.height = "50px";

    for(let i=0; i<etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += "<div class='numero pisca'></div>";
        } else {
            numeroHtml += "<div class='numero'></div>";
        }
    }

    seuVotoPara.style.display = "none";
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = "";
    aviso.style.display = "none";
    lateral.innerHTML = "";
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}</br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = "";
        for(let i in candidato.foto) {
            fotosHtml += `<div class="img">
            <img src="${candidato.foto[i].url}" alt="Lucas Terra">
            ${candidato.foto[i].legenda}
        </div>`;
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = "block";
        aviso.style.display = "block";
        descricao.innerHTML = `<div class="aviso-grnade pisca">O numero de Tiririca é 12345</div>`
    }
}

function clicou(n) {
    let elNumero = document.querySelector(".numero.pisca");
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove("pisca");
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
    const audio = document.querySelector('.audioTeclado');   
    audio.play();
    
}
function branco() {
    numero = ''
    votoBranco = true;
    seuVotoPara.style.display = "block";
    aviso.style.display = "block";
    numeros.innerHTML = "";
    descricao.innerHTML = `<div class="aviso-grnade pisca">Não desperdice o seu voto! Nego Vel é 12345</div>`;
    lateral.innerHTML = "";
    sizeOfThings()
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    if(numero === "12345"){
       
        document.querySelector('.tela').innerHTML = `<div class="aviso-fim pisca">Parabéns, você fez a Melhor escolha! </div>`;
        

        const audio = document.querySelector('.audioFim');
        audio.currentTime = 44;
        audio.play();

        var timer = setTimeout(function() {
            window.location.reload();
        }, 4000);
    }
}

comecarEtapa();

function sizeOfThings(){
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    var screenWidth = screen.width;
    var screenHeight = screen.height;
    
    if(screenWidth < 645) {
        numeros.style.height = "1px";
    }
    if(windowWidth < 570) {
        numeros.style.height = "1px";
    }
};
