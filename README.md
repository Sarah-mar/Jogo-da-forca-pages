## Links

 - **Jogo online:** https://sarah-mar.github.io/Jogo-da-forca-pages/ 

- **LinkedIn:** https://www.linkedin.com/in/sarah-marinho-ismart

# Jogo da Forca Temático
Este projeto implementa o clássico Jogo da Forca em Javascript puro e conta com sistema de temas e normalização de caracteres (suporte a acento).

## Funcionalidades
- **Seleção de Temas:** Escolha entre Animais, Cores, Frutas, Profissões e Países.

- **Sistema de Vidas:** Representado visualmente por corações de pixel art.

- **Tratamento de Acentos:** O jogo reconhece que "Á" é o mesmo que "A", facilitando a jogabilidade sem perder a grafia correta da palavra.

- **Interface Dinâmica:** Overlay de vitória ou derrota com opção de reiniciar a partida.

- **Persistência:** Utiliza localStorage para manter o tema selecionado entre as telas.

## Tecnologias Utilizadas
- **HTML5:** Estrutura semântica dos elementos.

- **CSS3:** Estilização, animações de hover e layout do Overlay.

- **JavaScript (ES6+):** Lógica do jogo, manipulação de DOM e tratamento de strings.

## Estrutura do Projeto
```
js-version/
│
├── index.html
├── index.css
├── index.js
├── gamemodes.html
├── gamemodes.css
├── gamemodes.js
├── game.html
├── game.css
├── game.js
└── background.js
```

## Como Jogar
1) Selecione um tema na tela inicial.

2) Tente adivinhar a palavra oculta clicando nas letras do alfabeto.

3) Cada erro remove um coração (você tem 7 tentativas).

4) O jogo termina quando você completa a palavra ou suas tentativas acabam.

## Detalhes Técnicos
### Normalização de Strings
Para garantir que o jogador não precise adivinhar acentos específicos, o código utiliza a técnica de decomposição Unicode:

```
function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
```

Isso permite que ao clicar na letra "O", o sistema identifique letras como "Ó", "Õ" ou "Ô" na palavra secreta.

### Sistema de Overlay
A overlay é acionada dinamicamente via JavaScript alterando o display para flex, bloqueando a interação com o jogo ao fundo e exibindo o resultado final.

## Preview

### Eventos 
|Evento|Ação do Jogo|
|---|---|
|Acerto|A letra é revelada em sua posição original.|
|Erro|Um coração é removido da ``tries-left-content``.|
|Vitória|Overlay aparece com a mensagem winHeader e revela a palavra.|
|Derrota|Overlay aparece com a mensagem lostHeader e revela a palavra.|

## Melhorias Futuras
- Expansão dos temas e da quantidade de palavras por tema
- Modo multiplayer
- Efeitos sonoros

## Autor
Desenvolvido por Sarah Marinho
