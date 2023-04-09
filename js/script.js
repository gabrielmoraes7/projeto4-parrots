let quantityCards;            //recebe a quantidade de cartas que o usuario deseja para o jogo
let firstCard,secondCard;     //variaveis que guardaram se o usuario selecionou as duas cartas para confirmar o acerto ou não
let auxArray = [];            //array temporaria para guardar as cartas usadas em jogo

//array contendo os gifs das caras
const cards = [   
  "./assets/bobrossparrot.gif",
  "./assets/explodyparrot.gif",
  "./assets/fiestaparrot.gif",
  "./assets/metalparrot.gif",
  "./assets/revertitparrot.gif",
  "./assets/tripletsparrot.gif",
  "./assets/unicornparrot.gif"
]; 

//trecho onde verifico a quantidade de cartas q o usuario deseja
let aux;
while (aux != true) {
  quantityCards = prompt("Digite um número par de 4 a 14.");
  if (quantityCards >= 4 && quantityCards <= 14 && quantityCards % 2 === 0) {
    alert("Número válido: " + quantityCards);
    aux = false;
    break;
  } else {
    alert("Número inválido. Digite um número par de 4 a 14.");
  }
} 

//vira as cartas
function flipCard(carta){
  if (carta.classList.contains('.card')) {
      return;
  }

  else if (firstCard  !== undefined && secondCard !== undefined) {
    return;
  }

  else if (firstCard  === undefined || secondCard === undefined) {
    carta.classList.add('.card');
    console.log(carta);
  }
}


function randCards(){
  return Math.random() - 0.5; 
}

//mistura as cartas já existentes em duplas na Array Auxiliar  
function mixCards(){
  const aux1 = quantityCards * 0.5;

  for (let i = 0; i < aux1; i++) {
    auxArray.push(cards[i]); //add duas vezes a mesma carta para guardar as duplas
    auxArray.push(cards[i]);
  }

  auxArray.sort(randCards); //randomiza a ordem do jogo da memoria
}

//coloca a quantidade de cartas q o usuario deseja na tela para serem escolhidas
function setCards(){
  let aux1 = document.querySelector('.box-card');

  for (let i = 0; i < auxArray.length; i++) {
    let numberCards = `
    <li>
      <div class="card">
          <div class="front-face face">
              <img class="parrot" src="./assets/back.png">
          </div>
          <div class="back-face face">
              <img src='${auxArray[i]}'>
          </div>
      </div>
    </li>`;

    aux1.innerHTML +=numberCards;
    console.log(this);
    
  }
}

mixCards();
setCards();




