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

createWorkExPage();
sectionContent.appendChild(pageEnd);





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


    return testingElementDiv;
}


function createWorkExPage(){
    for(let i=0; i<(workExArray.length)/3; i++){
        let testingGridDiv = document.createElement("div");
        testingGridDiv.classList.add("testing-grid-third");

        let child1 = createWorkExDiv(workExArray[i*3]);
        let child2 = createWorkExDiv(workExArray[(i*3)+1]);
        let child3 = createWorkExDiv(workExArray[(i*3)+2]);

        testingGridDiv.appendChild(child1);
        testingGridDiv.appendChild(child2);
        testingGridDiv.appendChild(child3);

        sectionContent.appendChild(testingGridDiv);

        child1.onclick = ()=>{
            // workExDiv = child1;
            expandWorkEx(child1);
        };
        child2.onclick = ()=>{
            // workExDiv = child2;
            expandWorkEx(child2);
        };
        child3.onclick = ()=>{
            // workExDiv = child3;
            expandWorkEx(child3);
        };
    }
}

function expandWorkEx(workExDiv){

    if(expandedWorkExDiv != null && workExDiv != expandedWorkExDiv){
        console.log("workExDiv != expandedWorkExDiv");
        closeWorkEx(expandedWorkExDiv);
    }

    let parent = workExDiv.parentElement;
    let childrenArray = [...parent.children];

    console.log(childrenArray);

    let otherChildrenDiv = document.createElement("div");
    otherChildrenDiv.classList.add("testing-grid-half");
    parent.parentElement.appendChild(otherChildrenDiv);
    parent.parentElement.insertBefore(otherChildrenDiv, parent.nextSibling);

    childrenArray.forEach(curr => {
        if(curr == workExDiv){
            parent.className = "testing-grid-opened";
        }
        else{
            otherChildrenDiv.appendChild(curr);
        }
    });

    workExDiv.onclick = ()=>{
        closeWorkEx(workExDiv);
    }

    expandedWorkExDiv = workExDiv;

    
}

function closeWorkEx(workExDiv){

    // if(workExDiv != expandedWorkExDiv){
    //     console.log("workExDiv != expandedWorkExDiv");
    //     closeWorkEx(expandedWorkExDiv);
    // }

    let parent = workExDiv.parentElement;
    let childrenArray = [...parent.nextSibling.children];

    console.log(childrenArray);
    parent.className = "testing-grid-third";

    childrenArray.forEach(curr =>{
        parent.appendChild(curr);
    });
    parent.nextSibling.remove();
    workExDiv.onclick = ()=>{
        expandWorkEx(workExDiv);
    };

    
}
