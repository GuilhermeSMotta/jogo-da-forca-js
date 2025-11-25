function randomInt(min = 0, max = 10000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const palavras = [
    "casa", "carro", "mae", "pai", "teto", "porta", "chave", "mesa", "pente",
    "livro", "sala", "cozinha", "banana", "uva", "mel", "sapo", "gato", "cachorro",
    "peixe", "vaca", "boi", "galinha", "porco", "lobo", "tigre", "leao", "zebra",
    "foca", "urso", "cobra", "abelha", "aranha", "touro", "pato", "rato",
    "limao", "manga", "pera", "cebola", "tomate", "milho", "feijao", "arroz",
    "faca", "garfo", "copo", "prato", "janela", "fogao", "chinelo", "sapato",
    "meia", "calca", "blusa", "camisa", "saia", "boneca", "bola", "corda",
    "lapis", "caneta", "papel", "borracha", "tinta", "pincel", "caderno",
    "radio", "filme", "foto", "piano", "violao", "bateria", "som", "fone", "cabo",
    "nuvem", "vento", "chuva", "pedra", "areia", "terra", "fogo", "ar", "luz",
    "carne", "pao", "bolo", "agua", "suco", "cafe", "leite",
    "primo", "prima", "tio", "tia", "avo", "irmao", "irma",
    "amigo", "amiga", "colega", "chefe",
    "verde", "vermelho", "azul", "amarelo", "branco", "preto", "cinza", "rosa",
    "noite", "dia", "mes", "ano", "tempo", "hora",
    "festa", "jogo", "passeio", "corrida", "nado", "salto",
    "roda", "motor", "pneu", "freio", "farol",
    "avião", "navio", "barco", "treno",
    "rio", "mar", "lago", "ilha", "campo", "floresta", "areia", "praia",
    "couro", "ferro", "papel", "plastico", "metal", "vidro",
    "forca", "jogo", "monstro", "cenoura", "variavel", "javascript",
    "gelo", "neve", "chuva", "vento", "arvore", "folha", "raiz"
];

const tentativasMax = 6;

let tentativa = 0;
let palavra = palavras[randomInt(0, palavras.length - 1)];

const estadoBoneco = [
    '____  \n|  |  \n|     \n|     \n|     \n|_____',
    '____  \n|  |  \n|  O  \n|     \n|     \n|_____',
    '____  \n|  |  \n|  O  \n|  |  \n|     \n|_____',
    '____  \n|  |  \n|  O  \n| /|  \n|     \n|_____',
    '____  \n|  |  \n|  O  \n| /|\\ \n|     \n|_____',
    '____  \n|  |  \n|  O  \n| /|\\ \n| /   \n|_____',
    '____  \n|  |  \n|  O  \n| /|\\ \n| / \\ \n|_____'
];

let palavraForca = '_'.repeat(palavra.length);
let letrasUsadas = [];

const letraH = document.getElementById('letra');
const letrasUsadasH = document.getElementById('usadas');
const bonecoH = document.getElementById('boneco');
const palavraForcaH = document.getElementById('palavraForca');
const mensagem = document.getElementById('mensagem');
const botaoH = document.getElementById('botao');

bonecoH.textContent = estadoBoneco[tentativa];
palavraForcaH.textContent = palavraForca;

function atualizarPalavra(letra, palavra, palavraForcaAtual) {
    let novaPalavra = palavraForcaAtual.split('');

    for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === letra) {
            novaPalavra[i] = letra;
        }
    }

    return novaPalavra.join('');
}

function adicionar() {
    try {

        let letra = letraH.value.trim().toLowerCase();
        if (letra === "") return;

        if (letrasUsadas.includes(letra)) {
            mensagem.textContent = 'Letra já usada.';
            return;
        }

        if (letra.length !== 1) {
            mensagem.textContent = 'Digite apenas uma letra.';
            return;
        }

        letrasUsadas.push(letra);
        letrasUsadasH.textContent = letrasUsadas.join(', ');

        if (tentativa >= tentativasMax) {
            mensagem.textContent = 'Você perdeu! A palavra era: ' + palavra;
            return;
        }

        if (palavra.includes(letra)) {

            mensagem.textContent = 'Letra correta!';

            palavraForca = atualizarPalavra(letra, palavra, palavraForca);
            palavraForcaH.textContent = palavraForca;

            if (palavraForca === palavra) {
                mensagem.textContent = 'Parabéns! Você venceu!';
            }

        } else {
            tentativa++;
            mensagem.textContent = 'Letra incorreta!';
            bonecoH.textContent = estadoBoneco[tentativa];
        }

        if (tentativa >= tentativasMax) {
            mensagem.textContent = 'Você perdeu! A palavra era: ' + palavra;
        }

        letraH.value = '';
        letraH.focus();

    } catch (erro) {
        console.error("Erro detectado:", erro);

        mensagem.textContent = 'Ocorreu um erro inesperado! Tente reiniciar o jogo.';
    }
}

botaoH.addEventListener("click", adicionar);
letraH.addEventListener("keypress", (event) => { 
    if (event.key === "Enter") adicionar();
});

const botaoReiniciar = document.getElementById('reiniciar');

function reiniciarJogo() {
    tentativa = 0;
    palavraForca = '';
    letrasUsadas = [];

    novaPalavra = palavras[randomInt(0, palavras.length - 1)];
    palavra = novaPalavra;

    palavraForca = '_'.repeat(palavra.length);

    bonecoH.textContent = estadoBoneco[0];
    palavraForcaH.textContent = palavraForca;
    letrasUsadasH.textContent = '';
    mensagem.textContent = '';
    letraH.value = '';
}

botaoReiniciar.addEventListener("click", reiniciarJogo);
