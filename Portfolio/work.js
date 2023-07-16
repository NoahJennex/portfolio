var sectionContent = document.getElementById("sectionContent");
var pageEnd = document.createElement("div");
pageEnd.id = "end-div";
// var workExDiv = null //scuffed
var expandedWorkExDiv = null;

var workExArray = [
    ["Card Game", "cardGame", "/CardGame/crazyEightsPlayerForm.html"],
    ["Calculator", "calculator", "/Calculator/calc Alt.html"],
    ["Calendar", "calendar", "/Calendar/index.html"],
    ["Calculator", "calculator", "/Calculator/calc Alt.html"],
    ["Card Game", "cardGame", "/CardGame/crazyEightsPlayerForm.html"],
    ["Calculator", "calculator", "/Calculator/calc Alt.html"]
];

// var workExSecondArray = [
//     ["Card Game", "cardGame", "/CardGame/crazyEightsPlayerForm.html"],
//     ["Calculator", "calculator", "/Calculator/calc Alt.html"],
//     ["Calendar", "calendar", "/Calendar/index.html"],
//     ["Calculator", "calculator", "/Calculator/calc Alt.html"],
//     ["Card Game", "cardGame", "/CardGame/crazyEightsPlayerForm.html"],
//     ["Calculator", "calculator", "/Calculator/calc Alt.html"]
// ];

createWorkExPage();
// sectionContent.appendChild(pageEnd);





function createWorkExDiv(arrayIn){
// function createWorkExDiv(headerIn, imgIdIn, hrefIn){
    let testingElementDiv = document.createElement("div");
    testingElementDiv.classList.add("testing-element");
    let header = document.createElement("h3");
    header.innerHTML = arrayIn[0];
    // let hyperlink = document.createElement("a");
    // hyperlink.href = arrayIn[2];
    let previewImgDiv = document.createElement("div");
    previewImgDiv.classList.add("img-container");
    previewImgDiv.id = arrayIn[1];

    testingElementDiv.appendChild(header);
    // testingElementDiv.appendChild(hyperlink);
    // hyperlink.appendChild(previewImgDiv);
    testingElementDiv.appendChild(previewImgDiv);

    testingElementDiv.style.transition = "height 1s";
    // testingElementDiv.style.float = "left";

    // testingElementDiv.style.zIndex = "4";

    // header.style.position = "relative";
    // header.style.top = "20px";

    // previewImgDiv.style.position = "relative";
    // previewImgDiv.style.top = "20px";

    // testingElementDiv.style.position = "absolute";
    // testingElementDiv.style.position = "initial";

    // workExDiv.style.height = "350px";
    

    return testingElementDiv;
}

function createSecondWorkExDiv(arrayIn){
    let secondPage = document.getElementById
}


function createWorkExPage(){
    workExArray.forEach(curr =>{
        let tableDiv = document.getElementById("table");
        let currChild = createWorkExDiv(curr);
        let tableInnerChild = document.createElement("div");

        let secondChild = document.createElement("div");
        let backgroundChild = document.createElement("div");

        backgroundChild.style.backgroundColor = "white";
        backgroundChild.style.borderRadius = "25px";

        // secondChild.style.backgroundColor = "none";
        // secondChild.style.opacity = "0%";
        // secondChild.style.position = "fixed";
        // secondChild.style.zIndex = "0";
        // secondChild.style.width = "100%";
        // secondChild.style.height = "100%";
        // secondChild.style.position = "top 0px";
        // secondChild.style.position = "left 0px";
        // secondChild.classList.add("centered");


        tableInnerChild.style.position = "initial";


        tableInnerChild.appendChild(backgroundChild);
        backgroundChild.appendChild(currChild);
        currChild.appendChild(secondChild);

        tableDiv.appendChild(tableInnerChild);



        currChild.onclick = ()=>{expandWorkEx(currChild);}

        tableInnerChild.style.zIndex = "4";

        tableInnerChild.style.position = "absolute";
        currChild.style.height = "350px";
        tableInnerChild.style.position = "initial";
    });
}


function expandWorkEx(workExDiv){

    let parent = workExDiv.parentElement.parentElement;
    let grandParent = parent.parentElement;
    let childrenArray = [...grandParent.children];
    let parentWidth = grandParent.offsetWidth;
    let parentHeight = (grandParent.offsetHeight);

    parent.style.zIndex = "5";

    console.log(childrenArray)

    childrenArray.forEach(curr=>{
        if(curr.children[0].children[0] != workExDiv){
            // fadeOut(curr);
            fadeOut(curr.children[0]);
        }
        else{
            fadeOut(workExDiv.children[1]);
            // workExDiv.nextElementSibling.style.zIndex = "5";
            // fadeIn(workExDiv.nextElementSibling)
            
        }
        // fadeOut(curr.children[0].children[0]);
        // fadeOut(curr.children[0]);
        // fadeIn(curr);
    });

    parent.style.position = "absolute";
    // workExDiv.nextElementSibling.style.position = "absolute";
    workExDiv.style.width = String(parentWidth)+"px";

    workExDiv.style.height = String(parentHeight)+"px";
    // workExDiv.style.float = "left";

    // workExDiv.onclick = ()=>{}
    // workExDiv.nextElementSibling.onclick = ()=>{
    //     console.log("openDiv: ")
    //     console.log(workExDiv)
    //     closeWorkEx(workExDiv);
    // }
    workExDiv.onclick = ()=>{
        console.log("openDiv: ")
        console.log(workExDiv)
        closeWorkEx(workExDiv);
    }

    // expandedWorkExDiv = workExDiv;

    
}

function closeWorkEx(workExDiv){


    let parent = workExDiv.parentElement.parentElement;
    let grandParent = parent.parentElement;
    let childrenArray = [...grandParent.children];

    parent.style.zIndex = "4";

    childrenArray.forEach(curr=>{
        if(curr.children[0].children[0] != workExDiv){
            // fadeIn(curr);
            fadeIn(curr.children[0]);
        }
        else{
            fadeIn(workExDiv.children[1]);
            // workExDiv.nextElementSibling.zIndex = "0";
            workExDiv.zIndex = "5";
            // fadeOut(workExDiv.nextElementSibling)
        }
        // fadeIn(curr.children[0].children[0]);
        // fadeIn(curr.children[0]);
        // fadeOut(curr);
    });

    workExDiv.style.width = "100%";

    workExDiv.style.height = "350px";

    parent.style.position = "initial";

    // console.log(workExDiv)
    // workExDiv.nextElementSibling.onclick = ()=>{}
    workExDiv.onclick = ()=>{
        console.log("closeDiv: "+workExDiv)
        expandWorkEx(workExDiv);
    };
    
}


function fadeOut(elementIn){
    elementIn.style.transition = "opacity 1s";
    elementIn.style.opacity = "0%";
}

function fadeIn(elementIn){
    elementIn.style.transition = "opacity 1s";
    elementIn.style.opacity = "100%";
}
