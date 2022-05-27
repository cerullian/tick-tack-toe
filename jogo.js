// 1. Clicar na cell (em qualquer uma) e aparecer o x.png
// 2. Evitar dois x.png na mesma cela
// 3. Atualizar o jogador atual para X ou O
// 4. Indicar o jogador seguinte no div TURN
// 5. Verificar vitória

const cells = document.querySelectorAll('.cell'); // seleciona todos os elementos com a classe cell
const turn = document.querySelector('.turn');
var jogadorAtual = 'x.png';
const result = document.querySelector('.result');
const refresh = document.querySelector('.refresh');
var contador = 0;
var tabuleiro = [];
var vitoria = false;
var hipoteses = [
    {p1: 0, p2: 1, p3: 2},
    {p1: 3, p2: 4, p3: 5},
    {p1: 6, p2: 7, p3: 8},
    {p1: 0, p2: 3, p3: 6},
    {p1: 1, p2: 4, p3: 7},
    {p1: 2, p2: 5, p3: 8},
    {p1: 0, p2: 4, p3: 8},
    {p1: 2, p2: 4, p3: 6}
];

const atualizarJogador = () => turn.innerHTML = `Jogador: <img src="images/${jogadorAtual}" width="15">`;
const atualizarVitoria = (resultado) => { // recebe o argumento do resultado
    if (resultado) // se o resultado for true
        result.innerHTML = `Vitória: <img src="images/${jogadorAtual}" width="15">`;
    else // se o resultado for false
        result.innerHTML = `Empate`;
}

function verificarVitoria() {
    hipoteses.forEach( hipotese => { // loop para cada objecto na array hipótese
        if ((tabuleiro[hipotese.p1] && tabuleiro[hipotese.p2] && tabuleiro[hipotese.p3]) || (tabuleiro[hipotese.p1]==false && tabuleiro[hipotese.p2]==false && tabuleiro[hipotese.p3]==false)) { // se as posições estiverem no objecto e ainda estiverem com o valor false
            vitoria = true;
        }
    })
}

atualizarJogador();

cells.forEach( (cell,index) => { // verifica em cada elemento .cell e atribui-lhe um índice
    cell.onclick = e => {
        // console.log(cell.childNodes.length);
        if (cell.childNodes.length == 0 && !vitoria) { // enquanto vitória não for true
            contador++;
            const img = document.createElement('img');
            img.src="images/"+jogadorAtual;
            cell.appendChild(img);
            // console.log(index);
            tabuleiro[index] = jogadorAtual == 'x.png' ? true : false;
            // console.log(tabuleiro);
            verificarVitoria();
            console.log(vitoria); // transforma-se em true quando há uma vitória
            // alternativa
            // cell.innerHTML="<img src='images/x.png'>";
            if (vitoria) { // caso vitoria seja true
                atualizarVitoria(); // atualiza a vitória na class "result"
            }
            if (contador==9 && !vitoria) { // quando o contador chega ao nº de cells e vitoria continua false
                atualizarVitoria(false); // chama o atualizarVitoria com valor de false
            }
            jogadorAtual = jogadorAtual == 'x.png' ? 'o.png' : 'x.png'; // se o jogador atual for x, jogador atual passa a ser o, caso contrário é o x
            atualizarJogador();
        }
    };
});

refresh.style.cursor = "pointer";
refresh.onclick = e => location.reload(); // "e" é por ser uma função callback, é um event object, manda-o para o onclick
