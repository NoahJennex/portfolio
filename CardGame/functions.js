
// gets coordinates of an element
function getCoords(element) {
    let box = element.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
}

async function wait(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

//gets top card of a deck and moves it to another deck
async function moveTopOfDeck(deckFrom, deckTo, showCardFrom, showCardTo, animationTime, shrinkFrom, shrinkTo){
    if(deckFrom.deckArraylist.length != 0){
        [...document.getElementsByClassName("cardImg")].forEach(element => {element.style.transition = "all "+(animationTime/1000)+"s linear"});

        if(deckTo.div.firstChild){var toCoords = getCoords(deckTo.div.lastChild);}//checks if div has children, sets toCoords to location of the last child
        else{var toCoords = getCoords(deckTo.div);}//sets toCoords to the deck div
        let fromCoords = getCoords(deckFrom.div);
        let topCard = deckFrom.deckArraylist[deckFrom.deckArraylist.length-1];

        topCard.cardElement.style.left = (toCoords.left - fromCoords.left) + "px";
        topCard.cardElement.style.top = (toCoords.top - fromCoords.top) + "px";

        await wait(animationTime).then(() =>{
            //need to add timer so element moves before before getting sent to new div
            deckTo.div.appendChild(deckFrom.deckArraylist[deckFrom.deckArraylist.length-1].cardElement);
            deckTo.deckArraylist.push(deckFrom.deckArraylist.pop());
            deckFrom.updateDeck(showCardFrom, shrinkFrom);
            deckTo.updateDeck(showCardTo, shrinkTo);
        });
    }
    else{console.log(deckFrom.deckName+" is empty");}
}

//takes selected cards of a deck and moves them to another deck
async function moveSelectedCards(deckFrom, deckTo, showCardFrom, showCardTo, animationTime, shrinkFrom, shrinkTo){
    [...document.getElementsByClassName("cardImg")].forEach(element => {
        element.style.transition = "all "+(animationTime/1000)+"s linear";
        element.style.transform = null;
    });

    deckFrom.selectedArray.forEach(async element=> {
        if(deckTo.div.firstChild){var toCoords = getCoords(deckTo.div.lastChild);}//checks if div has children, sets toCoords to location of the last child
        else{var toCoords = getCoords(deckTo.div);}//sets toCoords to the deck div
        let fromCoords = getCoords(element.cardElement);

        let toCoordsParent = getCoords(deckTo.div);
        let fromCoordsParent = getCoords(deckFrom.div);

        console.log("to Coords: "+toCoords.left, toCoords.top);
        console.log("from Coords: "+fromCoords.left, fromCoords.top);
        // console.log("end Coords: "+((toCoords.left + toCoordsParent.left) - (fromCoords.left + fromCoordsParent.left)))
        console.log("end Coords: "+((fromCoords.left) - (toCoordsParent.left-fromCoordsParent.left)) + ", " + (toCoords.top - fromCoords.top))
        console.log("parent Coords: "+ toCoordsParent.left +", " + fromCoordsParent.left)


        // element.cardElement.style.left = ((toCoords.left - (toCoordsParent.left - fromCoordsParent.left))) + "px";
        element.cardElement.style.left = ((fromCoords.left) - (toCoordsParent.left-fromCoordsParent.left)) + "px";
        element.cardElement.style.top = (toCoords.top - fromCoords.top) + "px";

        await wait(animationTime).then(() =>{
            deckTo.div.appendChild(element.cardElement);
            //pushes element to new arraylist
            deckTo.deckArraylist.push(element);
            //removes item at the index of that element (finds element and removes from the arraylist)
            deckFrom.deckArraylist.splice(deckFrom.deckArraylist.indexOf(element), 1); 
            deckTo.updateDeck(showCardTo, shrinkFrom);
            deckFrom.updateDeck(showCardFrom, shrinkTo);
        });   
        deckFrom.selectedArray = [];//resets/empties the selectedArray
    });
}

async function dealDeck(deckFrom, deckTo, showCardFrom, showCardTo, animationTime, shrink){

}

//adds onclick eventlistener to all cards in a deck/hand
//raises and highlights clicked card, then adds to the selectedArray
function onCardClick(hand, amountSelectable){

    if(amountSelectable == null){
        hand.deckArraylist.forEach(card => {
            card.cardElement.onclick = function(){
                //if the card has already been added to the selectedArray it removes it and resets the card into the default position
                if(hand.selectedArray.includes(card)){
                    hand.selectedArray.splice(hand.selectedArray.indexOf(card), 1); 

                    card.cardElement.classList.add("cardHoverTrue");
                    card.cardElement.style.top = null;
                    card.cardElement.style.border = "solid 1px transparent";
                    card.cardElement.style.transform = null;
                }
                //adds card to the selectedArray removes the hover class
                else{
                    hand.selectedArray.push(card);

                    card.cardElement.classList.remove("cardHoverTrue");
                    card.cardElement.style.top = "-10px";
                    card.cardElement.style.border = "solid 1px limegreen";
                    card.cardElement.style.transform = "scale(1.05)";
                }
            }
        });
    }
    else{
        hand.deckArraylist.forEach(card => {
            card.cardElement.onclick = function(){
                //if the card has already been added to the selectedArray it removes it and resets the card into the default position
                if(hand.selectedArray.includes(card)){
                    console.log("if");
                    hand.selectedArray.splice(hand.selectedArray.indexOf(card), 1); 

                    card.cardElement.classList.add("cardHoverTrue");
                    card.cardElement.style.top = null;
                    card.cardElement.style.border = "solid 1px transparent";
                    card.cardElement.style.transform = null;
                }
                //adds card to the selectedArray removes the hover class
                else if(hand.selectedArray.length > amountSelectable-1){
                    console.log("else if");

                    hand.selectedArray[0].cardElement.classList.add("cardHoverTrue");
                    hand.selectedArray[0].cardElement.style.top = null;
                    hand.selectedArray[0].cardElement.style.border = "solid 1px transparent";
                    hand.selectedArray[0].cardElement.style.transform = null;

                    hand.selectedArray.shift();
                    
                    hand.selectedArray.push(card);

                    card.cardElement.classList.remove("cardHoverTrue");
                    card.cardElement.style.top = "-10px";
                    card.cardElement.style.border = "solid 1px limegreen";
                    card.cardElement.style.transform = "scale(1.05)";
                }
                else{
                    console.log("else");
                    hand.selectedArray.push(card);

                    card.cardElement.classList.remove("cardHoverTrue");
                    card.cardElement.style.top = "-10px";
                    card.cardElement.style.border = "solid 1px limegreen";
                    card.cardElement.style.transform = "scale(1.05)";
                }
            }
        });
    }
}

// both mouseOverCard and mouseOutCard were used when hovering over a card in a hand
// instead :hover is being used in css so these functions have no use at the moment
//keeping incase they are used later down the road
function mouseOverCard(element){
    console.log('mouseOver')
    element.cardElement.style.transform = "scale(1.01)";
    element.cardElement.style.top = "-10px";
}
function mouseOutCard(element){
    element.cardElement.style.transform = "scale(1)";
    element.cardElement.style.top = "0px";
}

export{getCoords, wait, moveTopOfDeck, moveSelectedCards, onCardClick, mouseOutCard, mouseOverCard};