var formDestination = "template.html";

var centerDiv = document.getElementById("center");

var playerMenu = document.createElement("div");
var playerCountMenu = document.createElement("div");
var playerNameMenu = document.createElement("form");
var playerCountMenuInner = document.createElement("div");
var playerCountTitle = document.createElement("div");

var playerCheckboxDiv = document.createElement("form");
// var playerCheckbox1 = document.createElement("checkbox");
var playerCheckbox2 = document.createElement("input");
var playerCheckbox2Label = document.createElement("label");
// playerCheckbox2Div.

var playerCheckbox3 = document.createElement("input");
var playerCheckbox3Label = document.createElement("label");

var playerCheckbox4 = document.createElement("input");
var playerCheckbox4Label = document.createElement("label");

var playerNameSubmitDiv = document.createElement("div");
var playerNameSubmit = document.createElement("input");

//PLAYERMENU

playerMenu.style.position = "absolute";
playerMenu.style.borderRadius = "15px";
// playerMenu.classList.add("menu");
playerMenu.style.top = "50%";
playerMenu.style.left = "50%";
playerMenu.style.transform = "translate(-50%, -50%)";

// PLAYERNAMEMENU
playerNameMenu.action = formDestination;
playerNameMenu.method = "GET";
// playerNameMenu 

// PLAYERCOUNTMENU

playerCountMenu.id = "playerCountMenu";
playerCountMenu.style.position = "relative";
playerCountMenu.classList.add("menu");
playerCountMenu.style.minWidth = "340px";
playerCountMenu.style.height = "200px";
playerCountMenu.style.borderRadius = "15px";

// PLAYERCOUNTMENUINNER

playerCountMenuInner.id = "playerCountMenuInner";
playerCountMenuInner.classList.add("centered");

// PLAYERCOUNTTITLE

playerCountTitle.id = "playerCountTitle";
playerCountTitle.innerHTML = "Select How Many Players:";
playerCountTitle.classList.add("headerDiv");


// PLAYERCHECKBOXDIV

// playerCheckboxDiv.classList.add("headerDiv");
playerCheckboxDiv.id = "playerCheckboxDiv";
playerCheckboxDiv.classList.add("grid-container-playerCheckbox");
playerCheckboxDiv.style.width = "100%";
// playerCheckboxDiv.style.margin = "auto";
playerCheckboxDiv.style.marginTop = "30px";
playerCheckboxDiv.style.rowGap = "30px";
playerCheckboxDiv.style.columnGap = "5px";
playerCheckboxDiv.style.color = "white";

playerCheckbox2.type = "radio";
playerCheckbox2.id = "playerRadio2";
playerCheckbox2.name = "playerCheckbox";
playerCheckbox2.value = "2";
playerCheckbox2.classList.add("checkbox");
playerCheckbox2.checked = true;


playerCheckbox3.type = "radio";
playerCheckbox3.id = "playerRadio3";
playerCheckbox3.name = "playerCheckbox";
playerCheckbox3.value = "3";
playerCheckbox3.classList.add("checkbox");


playerCheckbox4.type = "radio";
playerCheckbox4.id = "playerRadio4";
playerCheckbox4.name = "playerCheckbox";
playerCheckbox4.value = "4";
playerCheckbox4.classList.add("checkbox");


playerNameSubmit.type = "submit";
playerNameSubmit.classList.add("button");
playerNameSubmit.value = "Next";



// playerCheckboxDiv.appendChild(playerCheckbox2);
playerCheckbox2Label.htmlFor = "playerRadio2";
playerCheckbox2Label.innerHTML += "2 Players";
playerCheckbox2Label.style.whiteSpace = "nowrap";
playerCheckbox2Label.classList.add("disable-select");


// playerCheckboxDiv.appendChild(playerCheckbox3);
playerCheckbox3Label.htmlFor = "playerRadio3";
playerCheckbox3Label.innerHTML += "3 Players";
playerCheckbox3Label.style.whiteSpace = "nowrap";
playerCheckbox3Label.classList.add("disable-select");


// playerCheckboxDiv.appendChild(playerCheckbox4);
playerCheckbox4Label.htmlFor = "playerRadio4";
playerCheckbox4Label.innerHTML += "4 Players";
playerCheckbox4Label.style.whiteSpace = "nowrap";
playerCheckbox4Label.classList.add("disable-select");


playerNameSubmitDiv.classList.add("menu");
playerNameSubmitDiv.style.position = "relative";
playerNameSubmitDiv.style.width = "100%";
playerNameSubmitDiv.style.height = "50px";
playerNameSubmitDiv.style.marginTop = "10px";
playerNameSubmitDiv.style.borderRadius = "15px";


playerNameSubmit.classList.add("button");
playerNameSubmit.classList.add("centered");

playerNameSubmitDiv.appendChild(playerNameSubmit);
playerNameMenu.appendChild(playerNameSubmitDiv);


playerCheckboxDiv.appendChild(playerCheckbox2);
playerCheckboxDiv.appendChild(playerCheckbox2Label);

playerCheckboxDiv.appendChild(playerCheckbox3);
playerCheckboxDiv.appendChild(playerCheckbox3Label);

playerCheckboxDiv.appendChild(playerCheckbox4);
playerCheckboxDiv.appendChild(playerCheckbox4Label);

// playerCheckboxDiv.appendChild(playerCheckboxSubmit);

playerCountMenuInner.appendChild(playerCountTitle);
playerCountMenuInner.appendChild(playerCheckboxDiv);
playerCountMenu.appendChild(playerCountMenuInner);
playerMenu.appendChild(playerCountMenu);
playerMenu.appendChild(playerNameMenu);


centerDiv.appendChild(playerMenu);

onPlayerCheckboxClick();

document.querySelectorAll('input[name="playerCheckbox"]').forEach(element => {
    element.addEventListener("change",() =>onPlayerCheckboxClick());
});

playerCountMenu.style.transition = "all 0.75s linear";



function onPlayerCheckboxClick(){
    let playerSelectedValue = document.querySelector('input[name="playerCheckbox"]:checked').value;

    while((playerNameMenu.childElementCount-1) != playerSelectedValue){
        let playerNameMenuChild = document.createElement("div");

        if((playerNameMenu.childElementCount-1) < playerSelectedValue){

            playerNameMenu.insertBefore(playerNameMenuChild, playerNameSubmitDiv);

            playerNameMenuChild.id = "playerNameMenuChild";
            playerNameMenuChild.style.position = "relative";
            playerNameMenuChild.style.color = "white";
            playerNameMenuChild.classList.add("menu");
            playerNameMenuChild.style.width = "100%";
            playerNameMenuChild.style.borderRadius = "15px";
            playerNameMenuChild.style.marginTop = "10px";
            playerNameMenuChild.style.height = "100px";

            let playerNameMenuChildInner = document.createElement("div");
            playerNameMenuChildInner.id = "playerNameMenuChildInner";
            playerNameMenuChildInner.classList.add("centered");
            playerNameMenuChild.appendChild(playerNameMenuChildInner);
            playerNameMenuChildInner.style.width = "75%";

            let nameInput = document.createElement("input");
            nameInput.type = "text";
            nameInput.name = "playerName"+(playerNameMenu.childElementCount-1).toString();
            nameInput.required = true;
            nameInput.style.width = "100%";
            nameInput.style.marginTop = "5px";

            let playerHeader = document.createElement("div");
            playerHeader.classList.add("headerDiv");
            playerHeader.innerHTML = "Player "+(playerNameMenu.childElementCount-1)+" Name:";

            playerNameMenuChildInner.appendChild(playerHeader);
            playerNameMenuChildInner.appendChild(nameInput);



        }
        if((playerNameMenu.childElementCount-1) > playerSelectedValue){
            playerNameMenu.removeChild(playerNameMenu.lastElementChild.previousElementSibling);
        }
    }
}