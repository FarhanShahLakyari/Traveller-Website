const searchInput= document.getElementById("searchInput");
searchInput.addEventListener("keyup",function(){
    let value= searchInput.value.toLowerCase();
    let cards= document.querySelectorAll(".card");
    cards.forEach(function(card){
        let destination=
        card.querySelector("h3").textContent.toLowerCase();
        if(destination.includes(value)){
            card.style.display="block";
        }
        else{
            card.style.display="none";
        }
    
    });
});
function showDetails(place){
    alert("Welcome to "+ place + "!Explore this amazing destination.");
}
function filterDestination(category){
    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card){

        if(category === "all"){
            card.style.display = "block";
        }
        else if(card.classList.contains(category)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });
}
const images = [
    "images/paris.jpg",
    "images/dubai.jpg",
    "images/hunza.jpg",
    "images/bali.jpg"
];

let index = 0;

setInterval(() => {
    index++;

    if (index >= images.length) {
        index = 0;
    }

    document.getElementById("sliderImage").src = images[index];
}, 3000);
 