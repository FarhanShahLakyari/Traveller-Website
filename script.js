// ==========================
// IMAGE SLIDER
// ==========================

const images = [
  "images/paris.jpg",
  "images/dubai.jpg",
  "images/hunza.jpg",
  "images/bali.jpg"
];

let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  const slider = document.getElementById("sliderImage");
  if (slider) {
    slider.src = images[index];
  }
}, 3000);


// ==========================
// DESTINATION DATA
// ==========================

const destinations = {

  paris: {
    image: "images/paris.jpg.",
    title: "Paris",
    location: "France",
    category: "Historical",
    description: "Paris is famous for the Eiffel Tower, museums, cafes, and romantic atmosphere.",
    highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
    travel: "Best time to visit: April - June"
  },

  dubai: {
    image: "images/dubai.jpg.",
    title: "Dubai",
    location: "United Arab Emirates",
    category: "Adventure",
    description: "Dubai offers luxury shopping, desert safari, and Burj Khalifa.",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
    travel: "Best time to visit: November - March"
  },

  hunza: {
    image: "images/hunza.jpg.",
    title: "Hunza Valley",
    location: "Pakistan",
    category: "Mountains",
    description: "Hunza is known for mountains, lakes and beautiful valleys.",
    highlights: ["Attabad Lake", "Altit Fort", "Passu Cones"],
    travel: "Best time to visit: May - September"
  },

  bali: {
    image: "images/bali.jpg.",
    title: "Bali",
    location: "Indonesia",
    category: "Beaches",
    description: "Bali is famous for beaches, temples and tropical landscapes.",
    highlights: ["Kuta Beach", "Ubud", "Tanah Lot Temple"],
    travel: "Best time to visit: April - October"
  },

  rome: {
    image: "images/rome.jpg.",
    title: "Rome",
    location: "Italy",
    category: "Cultural",
    description: "Rome is famous for ancient Roman landmarks.",
    highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
    travel: "Best time to visit: April - June"
  },

  kenya: {
    image: "images/kenya.jpg.",
    title: "Maasai Mara",
    location: "Kenya",
    category: "nature",
    description: "Witness wildlife safaris and natural beauty.",
    highlights: ["Big Five", "Great Migration", "Hot Air Balloon"],
    travel: "Best time to visit: July - October"
  }

};


// ==========================
// SHOW DETAILS
// ==========================

function showDetails(place) {

  const d = destinations[place];

  if (!d) return;

  document.getElementById("modalImage").src = d.image;
  document.getElementById("modalTitle").innerText = d.title;
  document.getElementById("modalLocation").innerText = d.location;
  document.getElementById("modalCategory").innerText = d.category;
  document.getElementById("modalDescription").innerText = d.description;
  document.getElementById("modalTravel").innerText = d.travel;

  const list = document.getElementById("modalHighlights");
  list.innerHTML = "";

  d.highlights.forEach(item => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });

  document.getElementById("destinationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("destinationModal").style.display = "none";
}


// ==========================
// CATEGORY FILTER
// ==========================

function filterDestination(category) {

  const cards = document.querySelectorAll(".destination-card");

  cards.forEach(card => {

    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

}


// ==========================
// SEARCH
// ==========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll(".destination-card").forEach(card => {

      const text = card.innerText.toLowerCase();

      if (text.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  });

}


// ==========================
// EXPLORE BUTTON
// ==========================

const exploreBtn = document.querySelector(".explore-btn");

if (exploreBtn) {

  exploreBtn.addEventListener("click", function () {

    document.getElementById("destinations").scrollIntoView({
      behavior: "smooth"
    });

  });

}


// ==========================
// CLOSE MODAL OUTSIDE CLICK
// ==========================

window.onclick = function(event){

  const modal = document.getElementById("destinationModal");

  if(event.target == modal){
    modal.style.display = "none";
  }

}