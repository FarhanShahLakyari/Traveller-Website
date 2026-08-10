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

function startSlider() {
    const slider = document.getElementById("sliderImage");

    if (!slider) return;

    setInterval(function () {
        index = (index + 1) % images.length;
        slider.src = images[index];
    }, 3000);
}


// ==========================
// DESTINATION DATA
// ==========================

const destinations = {

    paris: {
        image: "images/paris.jpg",
        title: "Paris",
        location: "France",
        category: "Historical",
        description: "Paris is famous for the Eiffel Tower, museums, cafes, and beautiful streets.",
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
        travel: "Best time to visit: April - June"
    },

    dubai: {
        image: "images/dubai.jpg",
        title: "Dubai",
        location: "United Arab Emirates",
        category: "Adventure",
        description: "Dubai offers luxury shopping, desert safari, and the Burj Khalifa.",
        highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
        travel: "Best time to visit: November - March"
    },

    hunza: {
        image: "images/hunza.jpg",
        title: "Hunza Valley",
        location: "Pakistan",
        category: "Mountains",
        description: "Hunza is known for mountains, lakes, and beautiful valleys.",
        highlights: ["Attabad Lake", "Altit Fort", "Passu Cones"],
        travel: "Best time to visit: May - September"
    },

    bali: {
        image: "images/bali.jpg",
        title: "Bali",
        location: "Indonesia",
        category: "Beaches",
        description: "Bali is famous for beaches, temples, and tropical landscapes.",
        highlights: ["Kuta Beach", "Ubud", "Tanah Lot Temple"],
        travel: "Best time to visit: April - October"
    },

    rome: {
        image: "images/rome.jpg",
        title: "Rome",
        location: "Italy",
        category: "Cultural",
        description: "Rome is famous for ancient Roman landmarks and beautiful history.",
        highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
        travel: "Best time to visit: April - June"
    },

    kenya: {
        image: "images/kenya.jpg",
        title: "Maasai Mara",
        location: "Kenya",
        category: "Nature & Wildlife",
        description: "Maasai Mara is famous for wildlife safaris and natural beauty.",
        highlights: ["Big Five", "Great Migration", "Hot Air Balloon"],
        travel: "Best time to visit: July - October"
    },

    skardu: {
        image: "images/hunza.jpg",
        title: "Skardu",
        location: "Pakistan",
        category: "Mountains",
        description: "Skardu is known for mountains, lakes, valleys, and beautiful landscapes.",
        highlights: ["Shangrila Lake", "Deosai Plains", "Upper Kachura Lake"],
        travel: "Best time to visit: April - October"
    },

    maldives: {
        image: "images/bali.jpg",
        title: "Maldives",
        location: "Maldives",
        category: "Beaches",
        description: "Maldives is famous for crystal-clear water, beaches, and tropical islands.",
        highlights: ["Beaches", "Snorkeling", "Island Resorts"],
        travel: "Best time to visit: November - April"
    },

    switzerland: {
        image: "images/hunza.jpg",
        title: "Switzerland",
        location: "Switzerland",
        category: "Mountains",
        description: "Switzerland is known for breathtaking mountains, lakes, and scenic landscapes.",
        highlights: ["Swiss Alps", "Lake Geneva", "Interlaken"],
        travel: "Best time to visit: June - September"
    }
};


// ==========================
// LOCAL STORAGE
// ==========================

let favorites =
    JSON.parse(localStorage.getItem("travelFavorites")) || [];

let recentlyViewed =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];

let plannedTrips =
    JSON.parse(localStorage.getItem("plannedTrips")) || [];

let currentDestination = "";


// ==========================
// NOTIFICATION
// ==========================

function showNotification(message) {

    const notification =
        document.getElementById("notification");

    if (!notification) {
        alert(message);
        return;
    }

    notification.innerText = message;
    notification.classList.add("show");

    setTimeout(function () {
        notification.classList.remove("show");
    }, 2500);
}


// ==========================
// FAVORITES
// ==========================

function toggleFavorite(place) {

    if (!destinations[place]) return;

    const position = favorites.indexOf(place);

    if (position === -1) {

        favorites.push(place);

        showNotification(
            destinations[place].title +
            " added to favorites ❤️"
        );

    } else {

        favorites.splice(position, 1);

        showNotification(
            destinations[place].title +
            " removed from favorites"
        );
    }

    localStorage.setItem(
        "travelFavorites",
        JSON.stringify(favorites)
    );

    updateFavoriteButtons();
    updateDashboard();
}


// ==========================
// UPDATE FAVORITE BUTTONS
// ==========================

function updateFavoriteButtons() {

    Object.keys(destinations).forEach(function (place) {

        const button =
            document.getElementById("favorite-" + place);

        if (!button) return;

        if (favorites.includes(place)) {

            button.innerText =
                "💔 Remove from Favorites";

            button.classList.add("saved");

        } else {

            button.innerText =
                "❤️ Add to Favorites";

            button.classList.remove("saved");
        }
    });
}


// ==========================
// RECENTLY VIEWED
// ==========================

function addRecentlyViewed(place) {

    recentlyViewed =
        recentlyViewed.filter(function (item) {
            return item !== place;
        });

    recentlyViewed.unshift(place);

    recentlyViewed =
        recentlyViewed.slice(0, 5);

    localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(recentlyViewed)
    );

    updateDashboard();
}


// ==========================
// SHOW DETAILS
// ==========================

function showDetails(place) {

    const d = destinations[place];

    if (!d) return;

    currentDestination = place;

    addRecentlyViewed(place);

    const modal =
        document.getElementById("destinationModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalLocation =
        document.getElementById("modalLocation");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalTravel =
        document.getElementById("modalTravel");

    const list =
        document.getElementById("modalHighlights");


    if (modalImage) {
        modalImage.src = d.image;
    }

    if (modalTitle) {
        modalTitle.innerText = d.title;
    }

    if (modalLocation) {
        modalLocation.innerText = d.location;
    }

    if (modalCategory) {
        modalCategory.innerText = d.category;
    }

    if (modalDescription) {
        modalDescription.innerText = d.description;
    }

    if (modalTravel) {
        modalTravel.innerText = d.travel;
    }


    if (list) {

        list.innerHTML = "";

        d.highlights.forEach(function (item) {

            const li =
                document.createElement("li");

            li.innerText = item;

            list.appendChild(li);
        });
    }


    if (modal) {
        modal.style.display = "block";
    }
}


// ==========================
// CLOSE MODAL
// ==========================

function closeModal() {

    const modal =
        document.getElementById("destinationModal");

    if (modal) {
        modal.style.display = "none";
    }
}


// ==========================
// PLAN TRIP
// ==========================

function planTrip(place) {

    if (!destinations[place]) return;

    if (!plannedTrips.includes(place)) {

        plannedTrips.push(place);

        localStorage.setItem(
            "plannedTrips",
            JSON.stringify(plannedTrips)
        );

        showNotification(
            destinations[place].title +
            " added to Planned Trips ✈️"
        );

    } else {

        showNotification(
            destinations[place].title +
            " is already in Planned Trips ✈️"
        );
    }

    updateDashboard();
}


// ==========================
// PLAN CURRENT DESTINATION
// ==========================

function planCurrentDestination() {

    if (currentDestination) {
        planTrip(currentDestination);
    }
}


// ==========================
// REMOVE PLANNED TRIP
// ==========================

function removePlannedTrip(place) {

    if (!destinations[place]) return;

    plannedTrips =
        plannedTrips.filter(function (item) {
            return item !== place;
        });

    localStorage.setItem(
        "plannedTrips",
        JSON.stringify(plannedTrips)
    );

    updateDashboard();

    showNotification(
        destinations[place].title +
        " removed from Planned Trips"
    );
}


// ==========================
// CATEGORY FILTER
// ==========================

function filterDestination(category) {

    const cards =
        document.querySelectorAll(".destination-card");

    cards.forEach(function (card) {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}


// ==========================
// SEARCH
// ==========================

function setupSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener(
        "input",
        function () {

            const value =
                this.value.toLowerCase().trim();

            document
                .querySelectorAll(".destination-card")
                .forEach(function (card) {

                    const text =
                        card.innerText.toLowerCase();

                    if (text.includes(value)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }
                });
        }
    );
}


// ==========================
// DASHBOARD
// ==========================

function updateDashboard() {

    // FAVORITE COUNT

    const favoriteCount =
        document.getElementById("favoriteCount");

    if (favoriteCount) {
        favoriteCount.innerText =
            favorites.length;
    }


    // RECENT COUNT

    const recentCount =
        document.getElementById("recentCount");

    if (recentCount) {
        recentCount.innerText =
            recentlyViewed.length;
    }


    // PLANNED TRIPS COUNT

    const tripCount =
        document.getElementById("tripCount");

    if (tripCount) {
        tripCount.innerText =
            plannedTrips.length;
    }


    // FAVORITES

    const favoriteContainer =
        document.getElementById("favoriteDestinations");

    if (favoriteContainer) {

        favoriteContainer.innerHTML = "";

        if (favorites.length === 0) {

            favoriteContainer.innerHTML =
                "<p>No favorite destinations yet.</p>";

        } else {

            favorites.forEach(function (place) {

                const d = destinations[place];

                if (!d) return;

                const card =
                    document.createElement("div");

                card.className =
                    "dashboard-destination-card";

                card.innerHTML = `
                    <h4>❤️ ${d.title}</h4>
                    <p>${d.location}</p>

                    <button onclick="showDetails('${place}')">
                        View Details
                    </button>

                    <button onclick="toggleFavorite('${place}')">
                        Remove
                    </button>
                `;

                favoriteContainer.appendChild(card);
            });
        }
    }


    // RECENT DESTINATIONS

    const recentContainer =
        document.getElementById("recentDestinations");

    if (recentContainer) {

        recentContainer.innerHTML = "";

        if (recentlyViewed.length === 0) {

            recentContainer.innerHTML =
                "<p>No destinations viewed yet.</p>";

        } else {

            recentlyViewed.forEach(function (place) {

                const d = destinations[place];

                if (!d) return;

                const card =
                    document.createElement("div");

                card.className =
                    "dashboard-destination-card";

                card.innerHTML = `
                    <h4>👀 ${d.title}</h4>
                    <p>${d.location}</p>

                    <button onclick="showDetails('${place}')">
                        View Again
                    </button>
                `;

                recentContainer.appendChild(card);
            });
        }
    }


    // PLANNED TRIPS

    const plannedContainer =
        document.getElementById("plannedDestinations");

    if (plannedContainer) {

        plannedContainer.innerHTML = "";

        if (plannedTrips.length === 0) {

            plannedContainer.innerHTML =
                "<p>No trips planned yet.</p>";

        } else {

            plannedTrips.forEach(function (place) {

                const d = destinations[place];

                if (!d) return;

                const card =
                    document.createElement("div");

                card.className =
                    "dashboard-destination-card";

                card.innerHTML = `
                    <h4>✈️ ${d.title}</h4>
                    <p>${d.location}</p>

                    <button onclick="showDetails('${place}')">
                        View Details
                    </button>

                    <button onclick="removePlannedTrip('${place}')">
                        Remove
                    </button>
                `;

                plannedContainer.appendChild(card);
            });
        }
    }
}


// ==========================
// EXPLORE BUTTON
// ==========================

function setupExploreButtons() {

    const buttons =
        document.querySelectorAll(".explore-btn");

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const destinationSection =
                document.getElementById("destinations");

            if (destinationSection) {

                destinationSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

            closeModal();
        });
    });
}


// ==========================
// MODAL OUTSIDE CLICK
// ==========================

function setupModal() {

    window.addEventListener("click", function (event) {

        const modal =
            document.getElementById("destinationModal");

        if (modal && event.target === modal) {
            modal.style.display = "none";
        }
    });
}


// ==========================
// ESC KEY CLOSE MODAL
// ==========================

function setupEscapeKey() {

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
        }
    });
}


// ==========================
// PAGE INITIALIZATION
// ==========================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        startSlider();

        updateFavoriteButtons();

        updateDashboard();

        setupSearch();

        setupExploreButtons();

        setupModal();

        setupEscapeKey();

        console.log("Travel Explorer loaded successfully.");
    }
);