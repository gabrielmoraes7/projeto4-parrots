let quantityCards;                //recebe a quantidade de cartas que o usuario deseja para o jogo
let firstCard,secondCard;         //variaveis que guardaram se o usuario selecionou as duas cartas para confirmar o acerto ou não
let auxFirstCard, auxSecondCard;  //usadas para limpar as duas escolhas atuais  caso venham a ser erradas e voltar elas a sua posição original   
let auxArray = [];                //array temporaria para guardar as cartas usadas em jogo
let clicks = 0;                   //qntd de jogadas
let pairs = 0;                    //numero de pares de cartas 

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

  for (let i = 0; i < auxArray.length; i++) {       //alternativa encontrada ao ter falha para visualizar a carta selecionada foi usar uma div colocada em display: none; como sendo um farol identificador para comparar se ambas as cartas são semelhantes
    let numberCards = `                           
    <li onClick="flipCard(this)" class="card">
      <div data-test="card">
          <div class="selected-aux">                    
            '${auxArray[i]}'
          </div> 
          <div class="front-face face">
              <img class="parrot"  data-test="face-down-image" src="./assets/back.png">
          </div>
          <div class="back-face face">
              <img data-test="face-up-image" src='${auxArray[i]}'>
          </div>
      </div>
    </li>`;

    aux1.innerHTML +=numberCards;
    console.log(this);
    
  }
}

//vira as cartas
function flipCard(cardSelected){
  let auxFlip = false;            //auxiliar para impedir uma 3º carta

  clicks++;

  let frontFace = cardSelected.querySelector('.front-face');
  frontFace.classList.add('frontClick');

  let backFace = cardSelected.querySelector('.back-face');
  backFace.classList.add('backClick');

  cardSelected.classList.add('flipped');
  cardSelected.removeAttribute('onClick');
  //console.log("isso ai!!!");  teste

  if (!auxFlip) {
    auxFlip = true;
    firstCard = cardSelected;

  } else {
    secondCard = cardSelected;

    if (firstCard.querySelector('.selected').innerHTML === secondCard.querySelector('.selected').innerHTML) {
      firstCard.removeAttribute('onClick');
      secondCard.removeAttribute('onClick');
      firstCard = null;
      secondCard = null;
      pairs++;

      /*    teste para checar se a quantidade de pares selecionados bate com a quantidade de pares inseridos

      console.log(pairs);
      console.log(auxArray.length/2);
      */
      endGame();

    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.classList.add('backClick');
        
        secondCard.classList.remove('flipped');
        secondCard.classList.add('backClick');
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
    auxFlip = false;
  }

}

//função q verifica a cada par feito se todos os cards estão em "flipped", logo todos selecionados
function endGame() {
  const cards = document.querySelectorAll('.card');
  const allFlipped = [...cards].every(card => card.classList.contains('flipped'));
  if (allFlipped) {
    setTimeout(() => {
      alert(`Você ganhou em ${clicks} jogadas!` );
      
      let resp = prompt("Você gostaria de reiniciar a partida? (sim ou não)");
      while(resp !== "sim" && resp !== "não"){
        resp = prompt("Apenas digite: sim ou não");
      }

      if (resp === "sim"){
        location.reload();
      }
    }, 400);
    clearInterval(IntervalId);
  }
}

mixCards();
setCards();




