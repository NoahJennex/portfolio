"use strict";


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObjArray = JSON.parse(this.responseText);
        for(var i = 0; i < myObjArray.length; i++)
        {
            document.getElementById("r"+(i+1)+"c1").innerHTML += 
            myObjArray[i].name_field;
        }
        for(var i = 0; i < myObjArray.length; i++)
        {
            document.getElementById("r"+(i+1)+"c2").innerHTML += 
            myObjArray[i].address_field;
        }
        for(var i = 0; i < myObjArray.length; i++)
        {
            document.getElementById("r"+(i+1)+"c3").innerHTML += 
            myObjArray[i].contact_age;
        }
    }
};
xmlhttp.open("GET", "JSON_SELECT_RETURN_EXAMPLE.json", true);
xmlhttp.send();

