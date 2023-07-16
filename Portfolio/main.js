var scrollDirection = 1;
var sectionContent = document.getElementById("sectionContent");
var firstPage = document.getElementById("firstPage");
var body = document.querySelector("body");
var secondPage = document.getElementById("end-div");
var opacity = 1;



body.onwheel = direction => {
  if(direction.deltaY >= 0){
    // Scrolling Down with mouse
    secondPage.scrollIntoView(false);
    opacity = 0;
    console.log("down");
  } else {
    // Scrolling Up with mouse
    firstPage.scrollIntoView(false);
    opacity = 1;
    console.log("up");
  }
  // document.querySelector(".fadeScrollUp").style.opacity = opacity;
}