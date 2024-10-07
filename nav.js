// this file handles the navigation dropdown

var menu = document.getElementById("nav-menu");
var navB = document.getElementById("nav");

function openMenu(){
    if (menu.style.display === "block"){
        menu.style.display = "none";
    }
    else{
        menu.style.display = "block";
    }
}

document.addEventListener('click', function(event) {

    var clickInside = navB.contains(event.target);
    if(!clickInside && menu.style.display === "block"){
        menu.style.display = "none";
    }
});
