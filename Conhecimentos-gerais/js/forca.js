let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela(){

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";
    
    for(i = 0; i < palavraSecretaSorteada.length; i++){  
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }     
        }
        else{
            if (palavraSecretaSorteada[i] == " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }    
        }
    }   
}

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#C71585";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("OPS!", "Não foi dessa vez ... A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});

function listaAutomatica(){ // ativa o modo manual
    if (jogoAutomatico == true) {
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play-circle'></i>"
        palavras = [];
        jogoAutomatico = false;

        document.getElementById("abreModalAddPalavra").style.display = "block";
        document.getElementById("status").innerHTML = "Modo Manual";
    }
    else if(jogoAutomatico == false){ // ativa o modo automático
        document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause-circle'></i>"
        jogoAutomatico = true;

        document.getElementById("abreModalAddPalavra").style.display = "none";
        document.getElementById("status").innerHTML = "Modo Automático";
        
    }
}

const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "PROGRAMACAO",
            categoria:"INFORMATICA"
        },
        palavra002 = {
            nome: "HARDWARE",
            categoria:"INFORMATICA"
        },
        palavra003 = {
            nome: "SOFTWARE",
            categoria:"INFORMATICA"
        },
        palavra004 = {
            nome: "CIBERSEGURANCA",
            categoria:"INFORMATICA"
        },
        palavra005 = {
            nome: "REDES",
            categoria:"INFORMATICA"
        },
        palavra006 = {
            nome: "BANIMENTO",
            categoria:"INFORMATICA"
        },
        palavra007 = {
            nome: "COMPUTADOR",
            categoria:"INFORMATICA"
        },
        palavra008 = {
            nome: "ROTEADOR",
            categoria:"INFORMATICA"
        },
        palavra009 = {
            nome: "INTELIGENCIA",
            categoria:"INFORMATICA"
        },
        palavra010 = {
            nome: "ALGORITIMO",
            categoria:"INFORMATICA"
        },
        palavra011 = {
            nome: "PREVENCAO",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra012 = {
            nome: "ACIDENTE",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra013 = {
            nome: "NORMA DE SEGURANCA",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra014 = {
            nome: "EQUIPAMENTO DE PROTECAO INDIVIDUAL",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra015 = {
            nome: "EQUIPAMENTO DE PROTECAO COLETIVA",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra016 = {
            nome: "SEGURANCA",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra017 = {
            nome: "RESPONSABILIDADE",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra018 = {
            nome: "MONITORAMENTO",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra019 = {
            nome: "CARGA SUSPENSA",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra020 = {
            nome: "CINTO DE SEGURANCA",
            categoria:"SEGURANÇA DO TRABALHO"
        },
        palavra021 = {
            nome: "BROCA",
            categoria:"MECANICA"
        },
        palavra022 = {
            nome: "COMPASSO",
            categoria:"MECANICA"
        },
        palavra023 = {
            nome: "COMPONENTES",
            categoria:"MECANICA"
        },
        palavra024 = {
            nome: "EXTREMIDADE",
            categoria:"MECANICA"
        },
        palavra025 = {
            nome: "FORMULA",
            categoria:"MECANICA"
        },
        palavra026 = {
            nome: "DENSIDADE",
            categoria:"MECANICA"
        },
        palavra027 = {
            nome: "ATRITO",
            categoria:"MECANICA"
        },
        palavra028 = {
            nome: "REACAO",
            categoria:"MECANICA"
        },
        palavra029 = {
            nome: "CONTRACAO",
            categoria:"MECANICA"
        },
        palavra030 = {
            nome: "DILATACAO",
            categoria:"MECANICA"
        },
        palavra031 = {
            nome: "FIO ELETRICO",
            categoria:"ELETRICA"
        },
        palavra032 = {
            nome: "INTERRUPITOR",
            categoria:"ELETRICA"
        },
        palavra033 = {
            nome: "LAMPADA",
            categoria:"ELETRICA"
        },
        palavra034 = {
            nome: "TRANSFORMADOR",
            categoria:"ELETRICA"
        },
        palavra035 = {
            nome: "GERADOR",
            categoria:"ELETRICA"
        },
        palavra036 = {
            nome: "CIRCUITO",
            categoria:"ELETRICA"
        },
        palavra037 = {
            nome: "DISJUNTORES",
            categoria:"ELETRICA"
        },
        palavra038 = {
            nome: "TOMADAS ELETRICAS",
            categoria:"ELETRICA"
        },
        palavra039 = {
            nome: "TENSAO",
            categoria:"ELETRICA"
        },
        palavra040 = {
            nome: "CORRENTE ELETRICA",
            categoria:"ELETRICA"
        },
        palavra041 = {
            nome: "DISTRIBUIR",
            categoria:"LOGISTICA"
        },
        palavra042 = {
            nome: "REGISTRO",
            categoria:"LOGISTICA"
        },
        palavra043 = {
            nome: "ARMAZENAMENTO",
            categoria:"LOGISTICA"
        },
        palavra044 = {
            nome: "EMBALAGEM",
            categoria:"LOGISTICA"
        },
        palavra045 = {
            nome: "CAMINHAO",
            categoria:"LOGISTICA"
        },
        palavra046 = {
            nome: "GESTAO DE ESTOQUE",
            categoria:"LOGISTICA"
        },
        palavra047 = {
            nome: "TRANSPORTE AEREO",
            categoria:"LOGISTICA"
        },
        palavra048 = {
            nome: "PALETIZACAO",
            categoria:"LOGISTICA"
        },
        palavra049 = {
            nome: "ARMAZEM",
            categoria:"LOGISTICA"
        },
        palavra050 = {
            nome: "DISTRIBUIDORA",
            categoria:"LOGISTICA"
        },
    ];
}


function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria.length < 3) {
        abreModal("ATENÇÃO"," Palavra e/ou Categoria inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria
    }

    palavras.push(palavra);  
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
}

function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


