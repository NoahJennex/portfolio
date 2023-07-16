import {Card, Deck, Pile, Hand} from '/classes.js';
import {getCoords, moveTopOfDeck, moveSelectedCards, onCardClick} from '/functions.js';


var deck1 = new Deck("deck1");
var pile1 = new Pile("pile1");
var hand1 = new Hand(13, "hand1");
var hand2 = new Hand(13, "hand2");

var defaultAnimationTime = 300;

var deckDiv = document.getElementById("deck");

var pileDiv = document.getElementById("pile");
var handDiv = document.getElementById("hand");
var moveHandBtn = document.getElementById("moveHandBtn")

deckDiv.appendChild(deck1.div);
pileDiv.appendChild(pile1.div);
handDiv.appendChild(hand1.div);
handDiv.appendChild(hand2.div);


deck1.setStandardDeck();

console.log(deck1);

deck1.shuffleDeck();

deck1.setDeck(false);
pile1.setDeck(true);

// hand1.setDeck(true);
// hand2.setDeck(false);

await hand1.fillDeck(hand1.startingSize, deck1, 100);
await hand2.fillDeck(hand2.startingSize, deck1, 100);

hand1.updateDeck(true);
console.log(hand1);

// hand2.div.style.transform = "rotate(90deg)";
hand2.div.style.pointerEvents = "none";

deck1.div.onclick = function(){
    if(deck1.deckArraylist.length != 0){
        moveTopOfDeck(deck1, pile1, false, true, defaultAnimationTime);
    }
}
pile1.div.onclick = function(){
    if(pile1.deckArraylist.length != 0){
        moveTopOfDeck(pile1, hand1, true, true, defaultAnimationTime);
    }
}
moveHandBtn.onclick = function(){
    console.log(hand1.selectedArray);
    moveSelectedCards(hand1, deck1, true, false, defaultAnimationTime, false, false);
}
console.log("done");

