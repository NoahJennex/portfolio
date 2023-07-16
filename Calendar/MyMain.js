// create a date variable for todays date ... convert it to one year from today (api free version is from last year) 
// date var is set to a string
var date = new Date();
var startingYear = date.getFullYear()-1;
var startingMonth = date.getMonth()+1;
if(startingMonth < 10){startingMonth = "0"+startingMonth;}
var startingDay = date.getDate();
if(startingDay < 10){startingDay = "0"+startingDay;}
var startingDate = startingYear+"-"+startingMonth+"-"+startingDay;

// The calendar is created and rendered from the 3rd party javascript
var calendarElLeft = document.getElementById('left-calendar');
var calendarLeft = new FullCalendar.Calendar(calendarElLeft, {
    initialDate: startingDate,
    initialView: 'dayGridMonth'
});
calendarLeft.render();


// gets and HTML Collection of all the calendar elements/dates on the page
var calendarElements = document.getElementsByClassName('fc-daygrid-day-frame');
// sets the starting/selected calendar element and makes it yellow
var startingCalendarElement = document.querySelector('[data-date=\"'+startingDate+'\"]');
startingCalendarElement.style.backgroundColor = "lightYellow";
var selectedCalendarElement = startingCalendarElement;

// variables for the right side elements
var calendarRight = document.getElementById('right-calendar');
var table = document.createElement('table');
table.id = 'right-table';
var tableArray = [];
var weekList = true; //boolean for which section to show (weekList/search)

// adds onclick functions to all buttons
var buttons = document.getElementsByClassName('fc-button');
for(item of buttons){
    let element = item;
    // updates the calendar when a button is clicked
    element.onclick = function(){
        calendarElements = document.getElementsByClassName('fc-daygrid-day-frame');
        createCalendar(calendarLeft);
        calendarEventListeners();
    }
}

// when the dom is loaded, adds onclick functions to all the calendar elements/dates
document.addEventListener('DOMContentLoaded', function() {
    calendarEventListeners()
});

// Fetches all the holidays from the holiday API
var holidaysEvents;
(function(){
    
    fetch('https://holidayapi.com/v1/holidays?pretty&key=7533d477-ec4c-4490-a733-41f7f9be365d&country=US&year=2022')
        .then(function(response){
            
            return response.json();
        })
        .then(function(json){

            var holidays = json.holidays;
            // maps all the necessary date from API to array
            holidaysEvents = holidays.map(x=>
                x = {title: x.name, start: x.date, backgroundColor: "green"});
            // adds the data to the calendar
            holidaysEvents.forEach(x => {
                calendarLeft.addEvent(x);
            });
            fillTableArray(); //fills table array with the next 7 days after the selected date
            rightList(calendarRight, selectedCalendarElement); //creates the right section
        })
})();
            

// renders the Calendar
function createCalendar(calendar){
    document.addEventListener('DOMContentLoaded', function() {
        calendar.render();
    });
}

// creates and adds the weeklist to the right side
function rightList(insert, selected){
    weekList = true; //boolean used to tell it to show the week list
    fillTableArray(); //updates the table array
    // creates the elements for the weeklist
    table = document.createElement('table');
    table.id = 'right-table';
    var th = document.createElement('th');
    var button = document.createElement('button');
    button.style.float="right";
    button.innerHTML="Search";
    button.className = "fc-button";
    // button onclick function removes the weeklist and creates the searchlist
    button.onclick = function(){
        document.getElementById('right-table').remove();
        searchList(calendarRight);
    }
    th.innerHTML = "Upcoming Week";
    th.appendChild(button);
    insert.appendChild(table);
    table.appendChild(th);


    for(var i=0;i<8;i++){
        selected = tableArray[i];
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var tdTitle = document.createElement('div');
        var tdText = document.createElement('div');
        tdTitle.className = "tdTitle";

        // gets the day of the week for the date and appends it
        if(selected == null){break;}
        else if(selected.className.includes("fc-day-sat")){tdTitle.innerHTML = "Saturday";}
        else if(selected.className.includes("fc-day-sun")){tdTitle.innerHTML = "Sunday";}
        else if(selected.className.includes("fc-day-mon")){tdTitle.innerHTML = "Monday";}
        else if(selected.className.includes("fc-day-tue")){tdTitle.innerHTML = "Tuesday";}
        else if(selected.className.includes("fc-day-wed")){tdTitle.innerHTML = "Wednsday";}
        else if(selected.className.includes("fc-day-thu")){tdTitle.innerHTML = "Thursday";}
        else if(selected.className.includes("fc-day-fri")){tdTitle.innerHTML = "Friday";}
        else{tdTitle.innerHTML = "DAY";}

        // clones the holidays/events of the date and appends it to the table
        var selectedChild = selected.children.item(0).children.item(1).cloneNode(true);
        tdText.appendChild(selectedChild);
        td.appendChild(tdTitle);
        td.appendChild(tdText);
        tr.appendChild(td);
        table.appendChild(tr);

        if(i == 0){td.style.backgroundColor="lightYellow";}
    }
}

// creates and adds the searchlist to the right side
function searchList(insert){
    weekList = false; //boolean used to tell it to show the searchlist
    // creates the elements for the searchlist
    table = document.createElement('table');
    table.id = 'right-table';
    table.style.height = "37em";
    table.style.overflow = "scroll";
    var th = document.createElement('th');
    var button = document.createElement('button');
    var searchBar = document.createElement('input');
    th.appendChild(searchBar);
    th.appendChild(button);
    insert.appendChild(table);
    table.appendChild(th);
    button.style.float="right";
    button.innerHTML="Week";
    button.className = "fc-button";
    // button onclick function removes the searchlist and creates the weeklist
    button.onclick = function(){
        document.getElementById('right-table').remove();
        rightList(calendarRight);
    }
    var divContain = document.createElement('div');
    divContain.id="divContain";
    var rowOut = document.createElement('tr');
    var rowIn = document.createElement('tr');
    rowOut.appendChild(divContain);
    divContain.appendChild(rowIn);
    table.appendChild(rowOut);
    searchBar.type = "text";
    searchBar.id = "searchBar";
    searchBar.placeholder="Search";

    elements = document.getElementsByClassName('elements');

    // creates element for every holiday and shows it as a search result
    holidaysEvents.forEach(x=>{
        let element = document.createElement('div');
        element.id = x.start;
        element.innerHTML = x.title;
        let td = document.createElement('td');
        let tr = document.createElement('tr');
        tr.className = "elements";
        td.style.width = "100%";
        td.style.height= "auto";
        td.appendChild(element);
        tr.appendChild(td);
        rowIn.appendChild(tr);

        //adds onclick function to bring the calendar to date of the holiday
        element.onclick = function(){
            calendarLeft.gotoDate(element.id);
            selectedCalendarElement = document.querySelector('[data-date=\"'+element.id+'\"]');;
            let select = selectedCalendarElement;
            for(item of calendarElements){
                item.style.backgroundColor =  "white";
            }
            select.childNodes[0].style.backgroundColor =  "lightYellow";
            calendarElements = document.getElementsByClassName('fc-daygrid-day-frame');
            // updates calendar
            createCalendar(calendarLeft);
            calendarEventListeners();
        }
    })

    // every time a letter is typed or deleted from the search bar it updates the search results
    searchBar.onkeyup=function(){
        rowIn.innerHTML = ""; //resets the search results
        var filter; //variable used for what is typed in the search bar
        var input = document.getElementById('searchBar');
        if(input==null){filter = ""}
        else{filter = input.value.toUpperCase();}

        //filters the holiday events based on what is typed in the search bar (uses filter and include arrayList methods)
        let array = holidaysEvents
        array = array.filter(x=>x.title.toUpperCase().includes(filter));

        // creates element for every holiday and shows it as a search result
        elements = document.getElementsByClassName('elements');
        array.forEach(x=>{
            let element = document.createElement('div');
            element.id = x.start;
            element.innerHTML = x.title;
            let td = document.createElement('td');
            let tr = document.createElement('tr');
            tr.className = "elements";
            td.style.width = "100%";
            td.style.height= "auto";
            td.appendChild(element);
            tr.appendChild(td);
            rowIn.appendChild(tr);

            //adds onclick function to bring the calendar to date of the holiday
            element.onclick = function(){
                calendarLeft.gotoDate(element.id);
                selectedCalendarElement = document.querySelector('[data-date=\"'+element.id+'\"]');;
                // console.log(selectedCalendarElement);
                let select = selectedCalendarElement;
                for(item of calendarElements){
                    item.style.backgroundColor =  "white";
                }
                select.childNodes[0].style.backgroundColor =  "lightYellow";
                calendarElements = document.getElementsByClassName('fc-daygrid-day-frame');
                // updates calendar
                createCalendar(calendarLeft);
                calendarEventListeners();
            }
        })
    };
}


// updates the tableArray with the next 7 days after the selected calendar element
function fillTableArray(){
    tableArray = [];
    tableArray.push(selectedCalendarElement);
    let element = selectedCalendarElement;
    for(var i=0;i<7;i++){
        if(element == null){break;} //if its at the last element in the calendar
        // element equals the next day
        else if(element.nextSibling != null){
            element = element.nextSibling;
        }
        //if the day is the last in the row it goes down a row
        else{
            if(element == null){break;} //if its at the last element in the calendar
            element = element.parentElement;
            if(element == null){break;} //if its at the last element in the calendar
            element = element.nextSibling;
            if(element == null){break;} //if its at the last element in the calendar
            element = element.firstChild;
        }
        tableArray.push(element);
    }
}

// adds onclick function to every date shown on the calendar
function calendarEventListeners(){
    for(item of calendarElements){
        let element = item;
        element.onclick = function(){
            // sets all calendar dates to white
            for(item of calendarElements){
                item.style.backgroundColor =  "white";
            }
            // sets selected calendar element to yellow
            element.style.backgroundColor =  "lightYellow";
            selectedCalendarElement = element.parentElement;
            // updates tableArray
            fillTableArray();
            if(weekList == true){ //if weekList is being shown, update the weeklist
                document.getElementById('right-table').remove();
                rightList(calendarRight, selectedCalendarElement);
            }
        };
    }
}


