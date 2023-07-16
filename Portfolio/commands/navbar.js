// module.exports = {

//     execute(){
        var navArray = [
            [["Home", "index.html"], []],
            [["Work", "work.html"], ["Test 1","Test 2","Test 3"]], 
            [["Skills"], ["Test 4", "Test 5"]], 
            [["About"], []], 
            [["Resume", "resume.html"], []]
        ];
        var topNav = document.getElementById("topNav");

        let imgSearch = document.createElement('img');
        imgSearch.classList.add("imgSearch");    
        imgSearch.src = "icons\\glass_magnifying_icon_white.png";
        // imgSearch.src = "icons\\226571_glass_magnifying_icon.svg";
        imgSearch.width = "20";

        let imgX = document.createElement('img');
        imgX.classList.add("imgX");    
        imgX.src = "icons\\noun_X_white3.png";
        // imgX.src = "icons\\noun_X_2939490.svg";
        imgX.width = "15";

        var searchBar = document.createElement('input');
        // searchBar.className = "navSearch";

        // var dropdownArray = [[], ["Test 1","Test 2","Test 3"], ["Test 4, Test 5"], [], []];


        createMainNav();

        // Creates the main Navigation bar
        function createMainNav(){
            topNav.innerHTML = "";

            let navContainerLinks = document.createElement('div');
            navContainerLinks.classList.add("navContainerLinks");

            topNav.appendChild(navContainerLinks);

            navArray.forEach(x=>{
                let navTab = document.createElement('div');
                let a = document.createElement('a');
                // let tabDrop = document.createElement('div');
                a.innerHTML = x[0][0];
                a.href = x[0][1];

                // a.appendChild(navTab);
            
                navTab.appendChild(a);
                navTab.classList.add("elementTab");
                navTab.classList.add("fadeIn");
                navContainerLinks.appendChild(navTab);

                let dropdownContent = document.createElement('div');
                dropdownContent.classList.add("dropdown-content");
                dropdownContent.classList.add("fadeIn");

                let dropdiv = document.createElement('div');
                dropdiv.classList.add("dropdiv");

                dropdownContent.appendChild(dropdiv);

                x[1].forEach(y=>{

                    let dropA = document.createElement('a');


                    dropA.innerHTML = y;
                    dropdiv.appendChild(dropA);

                })
                if(x[1].length > 0){navTab.appendChild(dropdownContent)};
            })

            let navContainerIcons = document.createElement('div');
            navContainerIcons.classList.add("navContainerIcons");
            navContainerIcons.classList.add("fadeIn");

            topNav.appendChild(navContainerIcons);
            
            let li = document.createElement('div');
            let a = document.createElement('a');
            
            a.appendChild(imgSearch);
            a.onclick = createSearchNav;
            li.appendChild(a);
            li.classList.add("elementTab");
            navContainerIcons.appendChild(li);
        }




        // Creates the Search Navigation bar
        function createSearchNav(){
            topNav.innerHTML = "";

            let navContainerSearch = document.createElement('div');
            navContainerSearch.classList.add("navContainerSearch");
            navContainerSearch.classList.add("fadeIn");

            topNav.appendChild(navContainerSearch);

            let li = document.createElement('li');
            let a = document.createElement('a');
            li.classList.add("navSearch");
            
            a.appendChild(imgSearch);
            li.appendChild(a);
            navContainerSearch.appendChild(li);

            li = document.createElement('li');
            a = document.createElement('a');
            li.classList.add("navSearch");

            a.appendChild(searchBar);
            searchBar.placeholder="Search";
            li.appendChild(a);
            navContainerSearch.appendChild(li);

            li = document.createElement('li');
            a = document.createElement('a');
            li.classList.add("navSearch");

            a.appendChild(imgX);
            a.onclick = createMainNav;
            li.appendChild(a);
            navContainerSearch.appendChild(li);
            
        }

//     }

// }