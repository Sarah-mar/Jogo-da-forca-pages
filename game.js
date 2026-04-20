const themes = {
    "animais": [
        "cachorro", "gato", "elefante", "leão", "tigre", "urso", "lobo", "raposa", "girafa", "zebra",
        "macaco", "gorila", "chimpanze", "cavalo", "vaca", "boi", "porco", "ovelha", "cabra", "coelho",
        "rato", "camundongo", "esquilo", "castor", "lontra", "hiena", "guepardo", "panda", "canguru", "coalha",
        "ornitorrinco", "tatu", "tamandua", "preguica", "doninha", "furão", "texugo", "chacal", "dingo", "leopardo",
        "jaguar", "pantera", "bisão", "búfalo", "alce", "rena", "cervo", "antílope", "gazela", "iaque"
    ],
    "cores": [
        "vermelho", "azul", "verde", "amarelo", "roxo", "laranja", "rosa", "marrom", "preto", "branco",
        "cinza", "turquesa", "ciano", "magenta", "lilás", "bege", "bordô", "vinho", "mostarda", "ocre",
        "salmão", "coral", "anil", "esmeralda", "jade", "oliva", "pêssego", "caramelo", "chocolate", "grafite",
        "prata", "dourado", "bronze", "índigo", "lavanda", "menta", "marfim", "pérola", "areia", "terracota",
        "ameixa", "azul-marinho", "verde-limão", "verde-musgo", "rosa-choque", "vermelho-escuro", "azul-claro", "cinza-claro", "cinza-escuro", "amarelo-claro"
    ],
    "frutas": [
        "maçã", "banana", "laranja", "limão", "abacaxi", "manga", "uva", "pera", "pêssego", "ameixa",
        "cereja", "morango", "framboesa", "amora", "melancia", "melão", "kiwi", "maracujá", "goiaba", "acerola",
        "jabuticaba", "pitanga", "graviola", "caju", "figo", "tâmara", "damasco", "nectarina", "romã", "carambola",
        "lichia", "mangostão", "physalis", "coco", "cupuaçu", "umbu", "siriguela", "sapoti", "cabeludinha", "bacaba",
        "buriti", "açaí", "pequi", "jenipapo", "pinha", "ata", "fruta-do-conde", "grapefruit", "toranja", "kumquat"
    ],
    "profissões": [
        "médico", "engenheiro", "professor", "advogado", "arquiteto", "dentista", "enfermeiro", "psicólogo", "contador", "economista",
        "programador", "analista", "cientista", "pesquisador", "designer", "artista", "fotógrafo", "jornalista", "escritor", "ator",
        "diretor", "produtor", "músico", "cantor", "dançarino", "chef", "cozinheiro", "garçom", "barman", "piloto",
        "motorista", "mecânico", "eletricista", "encanador", "pedreiro", "carpinteiro", "marceneiro", "agricultor", "veterinário", "biólogo",
        "químico", "físico", "astrônomo", "geólogo", "historiador", "sociólogo", "filósofo", "bibliotecário", "secretário", "recepcionista"
    ],
    "países": [
        "brasil", "argentina", "chile", "peru", "colômbia", "venezuela", "equador", "bolívia", "paraguai", "uruguai",
        "méxico", "canadá", "estados unidos", "cuba", "haiti", "jamaica", "panamá", "costa rica", "honduras", "guatemala",
        "espanha", "portugal", "frança", "alemanha", "itália", "holanda", "bélgica", "suíça", "áustria", "polônia",
        "rússia", "ucrânia", "china", "japão", "coreia do sul", "índia", "paquistão", "indonésia", "tailândia", "vietnã",
        "austrália", "nova zelândia", "egito", "nigéria", "áfrica do sul", "marrocos", "argélia", "tunísia", "turquia", "grécia"
    ]
}

let triesLeft = 7;
let theme = localStorage.getItem('themeChoice') || "animais";
function wordSelector(key) {
    const themeWords = themes[key];
    return themeWords[Math.floor(Math.random() * themeWords.length)];
}

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function handleGuess(selectedLetter, word) {
    const letterContainers = document.querySelectorAll(".letter-container");
    let found = false;

    const normalizedSelected = normalize(selectedLetter.toLowerCase());
    const normalizedWord = normalize(word.toLowerCase());

    for (let i = 0; i < normalizedWord.length; i++) {
        if (normalizedWord[i] === normalizedSelected) {
            letterContainers[i].textContent = word[i];
            found = true;
        }
    }
    if (!found) {
        triesLeft--;
        console.log(`Errou! Tentativas restantes: ${triesLeft}`);
    }
}

function setupGame(chosenTheme) {
    const container = document.querySelector(".word-container");
    const word = wordSelector(chosenTheme);

    container.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        const newLetter = document.createElement("div");
        newLetter.classList.add("letter-container");
        if (word[i] === " ") newLetter.textContent = " ";
        container.appendChild(newLetter);
    }

    const alphabet = document.querySelectorAll('.alphabet-box');
    alphabet.forEach(el => {
        el.addEventListener('click', () => {
            if (el.classList.contains('used')) return;

            el.classList.add('used');
            handleGuess(el.id, word);
        });
    });
}


if (theme) {
    setupGame(theme);
}