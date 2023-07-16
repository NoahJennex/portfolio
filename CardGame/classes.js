import {getCoords, moveTopOfDeck, onCardClick, mouseOutCard, mouseOverCard} from '/functions.js'

// --CARD--

class Card{
    constructor(suit, value, pictureBack){
        this.suit = suit;
        this.value = value;
        this.pictureFront = this.getPictureFrontString(suit, value);
        this.pictureBack = pictureBack;

        this.cardElement = this.createCardElement();
    }
    //returns a string version of .svg file for the card based off the suit and value
    getPictureFrontString(suitIn, valueIn){
        let valueString = "";
        let suitString = "";

        if(valueIn > 1 && valueIn < 11){valueString = String(valueIn);}
        else if(valueIn == 1){valueString = "ace";}
        else if(valueIn == 11){valueString = "jack";}
        else if(valueIn == 12){valueString = "queen";}
        else if(valueIn == 13){valueString = "king";}

        if(suitIn == 0){suitString = "clubs";}
        else if(suitIn == 1){suitString = "diamonds";}
        else if(suitIn == 2){suitString = "hearts";}
        else if(suitIn == 3){suitString = "spades";}

        return "CardPNG\\"+ suitString +"_"+ valueString +".svg";

    }
    //returns a card element (img) for the card
    createCardElement(){
        let newCardElement = document.createElement("img");
        // newCardElement.id = this.pictureFront;
        newCardElement.className="cardImg";
        newCardElement.draggable=false;
        newCardElement.src=this.pictureFront;
        return newCardElement;
    }
}

// --DECK--

class Deck{
    constructor(deckName){
        this.deckArraylist = [];
        this.deckName = deckName;
        this.div = document.createElement("div");
        this.div.id = this.deckName
        this.div.className = "deck";
    }
    //creates an arraylist of 52 cards (standard deck)
    setStandardDeck(){
        this.deckArraylist = [];
        for(let i=1;i<14;i++){
            for(let j=0;j<4;j++){

                let value = i;
                let suit = j;

                let newDeckCard = new Card(suit,value, "CardPNG\\red.svg");
                this.deckArraylist.push(newDeckCard);
            }
        } 
    }
    //randomizes (shuffles) the deck
    shuffleDeck(){
        let tempArraylist = [];
        while(this.deckArraylist.length != 0){
            let randomNum = Math.floor(Math.random()*this.deckArraylist.length);
            tempArraylist.push(this.deckArraylist[randomNum]);
            this.deckArraylist.splice(randomNum,1);
        }
        this.deckArraylist = tempArraylist;

    }
    //fills a deck with a set amount of cards from another deck
    //takes cards from the end of the arraylist
    async fillDeck(sizeIn, deckIn, animationTime, shrinkFrom, shrinkTo){
        [...document.getElementsByClassName("cardImg")].forEach(element => {element.style.transition = "all "+(animationTime/1000)+"s linear"});
 
        for(var i=0;i<sizeIn;i++){
            await moveTopOfDeck(deckIn, this, false, false, animationTime, shrinkFrom, shrinkTo);
        }
    }
    //sets all the card elements into the deck div
    //should be used once when the deck is created
    //showCard is boolean -> true: card faced up, false: card faced down
    setDeck(showCard){
        this.deckArraylist.forEach(element => {
            this.div.appendChild(element.cardElement);  
        });
        this.updateDeck(showCard);
    }
    //updates the card elements in the deck div
    //should be used when the deck is set and needs to be updated
    //showCard is boolean -> true: card faced up, false: card faced down
    updateDeck(showCard){
        let count = 0;//count is used for the offset of the card elements in the deck
        this.deckArraylist.forEach(element =>{
            //updates if deck is face up or face down
            if(showCard == true){element.cardElement.src = element.pictureFront;}
            else{element.cardElement.src = element.pictureBack;}

            element.cardElement.className = "cardImg cardInDeck";
            //offsets each card element to look like its in a deck
            element.cardElement.style.left = count*0.25 + "px";
            element.cardElement.style.top = -count*0.15 + "px";
            element.cardElement.onclick = function(){}//disables any onclick eventlistener
            element.cardElement.style.border = "none";//removes any border styles

            count++;
        })
    }
}

// --PILE-- extends deck
// is the exact same as a deck for now might have changes in the future

class Pile extends Deck{
    constructor(pileName){
        super(pileName);
    }
}

// --HAND-- extends deck
// is the players hand. is visually different than a deck
// has a selected arraylist that holds cards that have been selected. 
//starting size determines the amount of cards the hand starts with
class Hand extends Deck{
    constructor(startingSize, handName){
        super(handName);
        this.startingSize = startingSize;
        this.selectedArray = [];
        this.div.classList.add("deckHand");
    }
    //Overrides
    setDeck(showCard){
        this.div.classList.add("hand");
        this.deckArraylist.forEach(element => {
            this.div.appendChild(element.cardElement) 
        });
        this.updateDeck(showCard);
    }
    //Overrides
    updateDeck(showCard, shrink, amountSelectable){
        let cardGap = 50;
        if(shrink == true){cardGap = 25;}

        let count = 0;//count is used for the offset of the card elements in the hand
        this.div.style.width = (cardGap*this.deckArraylist.length)+(100-cardGap) + "px";
        // this.div.style.paddingRight = (cardGap) + "px";
        this.deckArraylist.forEach(element =>{
            //updates if hand is face up or face down
            if(showCard == true){element.cardElement.src = element.pictureFront;}
            else{element.cardElement.src = element.pictureBack;}

            element.cardElement.style.top = null;//resets the card offset
            element.cardElement.style.left = null;//resets the card offset
            element.cardElement.style.left = count*(cardGap) + "px";//offsets the card 50 pixels to the left
            element.cardElement.className = "cardImg cardHand cardHoverTrue";
            element.cardElement.style.transform = null;

            onCardClick(this, amountSelectable);//adds onclick event listener to each card in the hand
            count++;
        })
    }
}

// --PLAYER--

class Player{
    constructor(name, hand){
        this.name = name;
        this.hand = hand;
        this.points = 0;
        this.nameDiv = document.createElement("div"); 
    }
}

export{Card, Deck, Pile, Hand, Player};