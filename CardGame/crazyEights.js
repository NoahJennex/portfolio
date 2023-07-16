import {Card, Deck, Pile, Hand, Player} from './classes.js';
import {getCoords, wait, moveTopOfDeck, moveSelectedCards, onCardClick} from './functions.js';

var defaultAnimationTime = 300;

var playerArray = [];
var rotateDegree = 0;
var centerRotateDegree = 0;
var playerTurn = 0;
var checkCardPass = false;
var pickUpLimit = 0;

var centerGrid = document.getElementById("grid-item-center");
var table = document.getElementById("tableInner");
var centerDiv = document.getElementById("center");
var handDiv1 = document.getElementById("handDiv1");
var handDiv2 = document.getElementById("handDiv2");
var handDiv3 = document.getElementById("handDiv3");
var handDiv4 = document.getElementById("handDiv4");

var defaultHandSize = 8;

var deck1 = new Deck("deck1");
var pile1 = new Pile("pile1");
var hand1 = new Hand(defaultHandSize, "hand1");
var hand2 = new Hand(defaultHandSize, "hand2");
var hand3 = new Hand(defaultHandSize, "hand3");
var hand4 = new Hand(defaultHandSize, "hand4");

//retrieves variales from form
const formOutput = [...new URLSearchParams(window.location.search)]
var numberOfPlayers = formOutput.length;
console.log("# of players: "+numberOfPlayers);

createTable(numberOfPlayers);


//start game





// FUNCTIONS

//creates the basics of the table (includes: the hands, decks, piles)
async function createTable(playerSize){
    // var defaultHandSize = 8;
    // // var defaultAnimationTime = 300;
    
    // var deck1 = new Deck("deck1");
    // var pile1 = new Pile("pile1");
    // var hand1 = new Hand(defaultHandSize, "hand1");
    // var hand2 = new Hand(defaultHandSize, "hand2");
    // var hand3 = new Hand(defaultHandSize, "hand3");
    // var hand4 = new Hand(defaultHandSize, "hand4");

    var rotateButton = document.createElement("button");
    rotateButton.innerHTML = "rotate";
    // document.body.appendChild(rotateButton);
    
    centerDiv.appendChild(pile1.div);
    centerDiv.appendChild(deck1.div);

// 2 Players
    if(numberOfPlayers == 2){
        //player1
        var player1 = new Player(formOutput[0][1], hand1);
        setPlayer(player1, handDiv1);

        //player2
        var player2 = new Player(formOutput[1][1], hand2);
        setPlayer(player2, handDiv3);
    }
// 3 Players
    else if(numberOfPlayers == 3){
        //player1
        var player1 = new Player(formOutput[0][1], hand1);
        setPlayer(player1, handDiv1);

        //player2
        var player2 = new Player(formOutput[1][1], hand2);
        setPlayer(player2, handDiv2);

        //player3
        var player3 = new Player(formOutput[2][1], hand3);
        setPlayer(player3, handDiv4);
    }
// 4 Players
    else if(numberOfPlayers == 4){
        //player1
        var player1 = new Player(formOutput[0][1], hand1);
        setPlayer(player1, handDiv1);
        
        //player2
        var player2 = new Player(formOutput[1][1], hand2);
        setPlayer(player2, handDiv2);

        //player3
        var player3 = new Player(formOutput[2][1], hand3);
        setPlayer(player3, handDiv3);

        //player4
        var player4 = new Player(formOutput[3][1], hand4);
        setPlayer(player4, handDiv4);
    }
    
    deck1.setStandardDeck();
    deck1.shuffleDeck();
    deck1.setDeck(false);
    pile1.setDeck(true);
    
    await pile1.fillDeck(1,deck1, 100);
    pile1.updateDeck(true);

    for(let i = 0;i<playerSize;i++){
        await playerArray[i].fillDeck(playerArray[i].startingSize, deck1, 100, false, true);
    }
    
    hand1.updateDeck(true, false, 1);
    hand2.updateDeck(false, true, 1);
    hand3.updateDeck(false, true, 1);
    hand4.updateDeck(false, true, 1);
    
    hand1.div.style.transform = "scale(1.1)";
    
    rotateButton.onclick = function(){
        // console.log(player1.hand)
        if(playerTurn == -1){endPlayerTurn(playerArray[playerArray.length-1], pile1);}
        else{endPlayerTurn(playerArray[playerTurn], pile1);}
        // wait(moveSelectedCards(playerArray[playerTurn], pile1, true, true, defaultAnimationTime)).then(() => nextTurn());
        // nextTurn();
        wait(defaultAnimationTime).then(()=>{nextTurn()});
    }

    pile1.div.onclick = async function(){
        if(playerTurn == -1){
            playableCardCheck(pile1, playerArray[playerArray.length-1].selectedArray[0]);
            if(checkCardPass == true){
                cardAbilityCheck(playerArray[playerArray.length-1].selectedArray[0])
                endPlayerTurn(playerArray[playerArray.length-1], pile1);
                await wait(defaultAnimationTime).then(()=>{nextTurn()});
            }
        }
        else{
            playableCardCheck(pile1, playerArray[playerTurn].selectedArray[0]);
            if(checkCardPass == true){
                cardAbilityCheck(playerArray[playerTurn].selectedArray[0])
                endPlayerTurn(playerArray[playerTurn], pile1);
                await wait(defaultAnimationTime).then(()=>{nextTurn()});
            }
        }
    }

    deck1.div.onclick = async function(){
        if(pickUpLimit != 1){
            if(playerTurn == -1){
                moveTopOfDeck(deck1, playerArray[playerArray.length-1], false, true, defaultAnimationTime)
            }
            else{
                moveTopOfDeck(deck1, playerArray[playerTurn], false, true, defaultAnimationTime)
            }
            pickUpLimit++;
        }
        else{
            console.log("You've already picked up a card from the deck");
        }
    }


}

//determines which players turn it is based on the amount of players are playing
//uses the rotateCounterClock() function to rotate the board 
async function nextTurn(){
    pickUpLimit = 0;
    let rotationTime = 750;

    if(numberOfPlayers == 2 || (numberOfPlayers == 3 && playerTurn == 1)){
        rotateCounterClock();
        await wait(rotationTime).then(()=>{rotateCounterClock()});
        rotationTime = rotationTime*2;
    }
    else{rotateCounterClock();}

    await wait(rotationTime).then(()=>{
        playerTurn++;
        for(let i=0;i<playerArray.length;i++){
            if(i==playerTurn){playerArray[i].updateDeck(true);}
            else{playerArray[i].updateDeck(false,true);}
        }
        playerArray[playerTurn].div.style.transform = "scale(1.1)";
        if(playerTurn == playerArray.length-1){playerTurn = -1;}
    });
}
async function skipTurn(){
    pickUpLimit = 0;
    let rotationTime = 750;

    if(numberOfPlayers == 2 || (numberOfPlayers == 3 && playerTurn == 1)){
        rotateCounterClock();
        await wait(rotationTime).then(()=>{rotateCounterClock()});
        rotationTime = rotationTime*2;
    }
    else{rotateCounterClock();}

    await wait(rotationTime).then(()=>{
        playerTurn++;
        if(playerTurn == playerArray.length-1){playerTurn = -1;}
    });
}

//rotates the table counter clockwise and update the hands
function rotateCounterClock() {
    if(playerTurn == -1){
        playerArray[playerArray.length-1].updateDeck(false,true);
        playerArray[playerArray.length-1].div.style.transform = "scale(1)";
    }
    else{
        playerArray[playerTurn].updateDeck(false,true);
        playerArray[playerTurn].div.style.transform = "scale(1)";
    }
    rotateDegree += -90;
    centerRotateDegree += 90;
    table.style.transform = "rotate("+rotateDegree+"deg)";
    centerGrid.style.transform = "rotate("+centerRotateDegree+"deg)";
}

//adds player to array and creates div for player name
function setPlayer(player, handDiv){
    playerArray.push(player.hand);
    handDiv.appendChild(player.hand.div);
    player.nameDiv.classList.add("nameDiv");
    player.nameDiv.innerHTML = player.name;
    handDiv.appendChild(player.nameDiv);
}

function endPlayerTurn(playerHand, deckTo){
    moveSelectedCards(playerHand, deckTo, true, true, defaultAnimationTime);
}

async function cardAbilityCheck(playedCard){
    console.log(playedCard);
    if(playedCard.value == 2){
        console.log("pick up 2")
        playerArray[playerTurn+1].fillDeck(2, deck1, defaultAnimationTime);
    }
    else if(playedCard.value == 11){
        console.log("miss your turn")
        skipTurn();
    }
    else if(playedCard.value == 8){

    }
}

function playableCardCheck(pile, playedCard){
    checkCardPass = false;
    let topOfPile = pile.deckArraylist[pile.deckArraylist.length-1];

    if(topOfPile.suit == playedCard.suit || topOfPile.value == playedCard.value || playedCard.value == 8){
        checkCardPass = true;
    }
}
