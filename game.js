const themes = {
    // "animais": [
    //     "cachorro", "gato", "elefante", "leão", "tigre", "urso", "lobo", "raposa", "girafa", "zebra",
    //     "macaco", "gorila", "chimpanze", "cavalo", "vaca", "boi", "porco", "ovelha", "cabra", "coelho",
    //     "rato", "camundongo", "esquilo", "castor", "lontra", "hiena", "guepardo", "panda", "canguru", "coalha",
    //     "ornitorrinco", "tatu", "tamandua", "preguica", "doninha", "furão", "texugo", "chacal", "dingo", "leopardo",
    //     "jaguar", "pantera", "bisão", "búfalo", "alce", "rena", "cervo", "antílope", "gazela", "iaque"
    // ],
    "animais": ["rato"],
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
const lostHeader = "Não foi dessa vez... A palavra era:"
const winHeader = "Parabéns, você arrasou! A palavra era:"

let theme = localStorage.getItem('themeChoice');
function wordSelector(key) {
    const themeWords = themes[key];
    return themeWords[Math.floor(Math.random() * themeWords.length)];
}

function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let currentWord = "";

function handleGuess(selectedLetter, word) {
    const letterContainers = document.querySelectorAll(".letter-container");
    let found = false;

    const normalizedSelected = normalize(selectedLetter.toLowerCase());
    const normalizedWordwithSpaces = normalize(word.toLowerCase());
    const normalizedWord = normalizedWordwithSpaces.replaceAll(' ', '').replaceAll('-', '');
    let comparisonWord = word.replaceAll(' ', '').replaceAll('-', '');


    for (let i = 0; i < normalizedWord.length; i++) {
        if (normalizedWord[i] === normalizedSelected) {
            letterContainers[i].textContent = comparisonWord[i];
            found = true;
        }
    }

    if (found) {
        const allFilled = Array.from(letterContainers).every(div => div.textContent.trim() !== "");
        if (allFilled) {
            showOverlay(winHeader, word);
        }
    } else {
        triesLeft--;
        let triesBox = document.querySelector(".tries-box");
        if (triesBox) triesBox.remove();

        if (triesLeft === 0) {
            showOverlay(lostHeader, word);
        }
    }
}

function showOverlay(header, word) {
    const overlay = document.querySelector(".overlay");

    overlay.innerHTML = "";

    let finishHeader = document.createElement("div");
    finishHeader.classList.add("finish-header");
    finishHeader.innerHTML = header;

    let finishContent = document.createElement("div");
    finishContent.classList.add("finish-content");
    finishContent.innerHTML = word.toUpperCase();

    overlay.appendChild(finishHeader);
    overlay.appendChild(finishContent);


    let btnReset = document.createElement("button");
    btnReset.innerHTML = "Jogar Novamente";
    btnReset.onclick = () => window.location.href = "gamemodes.html";
    overlay.appendChild(btnReset);

    overlay.style.display = 'flex';
}

function setupGame(chosenTheme) {
    document.querySelector('.overlay').style.display = 'none';
    const wordContainer = document.querySelector(".word-container");
    const chosenThemeContainer = document.querySelector(".chosen-theme");
    let triesLeftContent = document.querySelector(".tries-left-content");


    currentWord = wordSelector(chosenTheme);

    chosenThemeContainer.innerHTML = chosenTheme;
    wordContainer.innerHTML = "";
    triesLeftContent.innerHTML = "";

    for (let i = 0; i < triesLeft; i++) {
        let newTriesBox = document.createElement("div");
        newTriesBox.innerHTML = '<img src="pinkPixelHeart.png" alt="Pink Pixel Heart" width="30">';
        newTriesBox.classList.add("tries-box");
        triesLeftContent.appendChild(newTriesBox);
    }

    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === " ") {
            const newLetter = document.createElement("div");
            newLetter.classList.add("space-container");
            newLetter.textContent = " ";
            wordContainer.appendChild(newLetter);
        }
        else if (currentWord[i] === "-") {
            const newLetter = document.createElement("div");
            newLetter.classList.add("space-container");
            newLetter.textContent = "-";
            wordContainer.appendChild(newLetter);
        }
        else {
            const newLetter = document.createElement("div");
            newLetter.classList.add("letter-container");
            wordContainer.appendChild(newLetter);
        }

    }

    const alphabet = document.querySelectorAll('.alphabet-box');
    alphabet.forEach(el => {

        el.classList.remove('used');

        const newEl = el.cloneNode(true);
        el.parentNode.replaceChild(newEl, el);

        newEl.addEventListener('click', () => {
            if (newEl.classList.contains('used')) return;
            newEl.classList.add('used');
            handleGuess(newEl.id, currentWord);
        });
    });
}

if (theme) {
    setupGame(theme);
}

