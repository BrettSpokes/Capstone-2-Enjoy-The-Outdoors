"use strict";

// Get references to the dropdown and info block elements
const MOUNTAINSEARCH = document.getElementById('mountainDropDown');
const INFOBLOCK = document.getElementById('infoBlock');

// Execute this code when the window loads
window.onload = () => {
    initMountainDropdown();
}

// Initialize the mountain dropdown
function initMountainDropdown() {
    // Create a placeholder option
    let placeHolder = new Option('Select One...', '');
    MOUNTAINSEARCH.appendChild(placeHolder);

    // Populate the dropdown with mountain options
    for (const VAL of mountainsArray) {
        let theOption = new Option(VAL.name, VAL.name);
        MOUNTAINSEARCH.appendChild(theOption);
    }
}

// Event listener for dropdown change
MOUNTAINSEARCH.addEventListener("change", function () {
    if (this.value) {
        const selectedValue = this.value;

        // Find the mountain based on the selected value
        let foundMountain = mountainsArray.find(mtn => mtn.name == selectedValue);
        let mountainSunInfo;

        // Fetch sunrise and sunset times for the mountain
        getSunsetForMountain(foundMountain.coords.lat, foundMountain.coords.lng).then(data => {
            mountainSunInfo = data.results;
            INFOBLOCK.innerHTML =
                `<h2>${foundMountain.name}</h1>
                <p>Description: ${foundMountain.desc}</p>
                <p>Elevation: ${foundMountain.elevation}</p>
                <p>Difficulty: ${foundMountain.effort}</p>
                <p>Sunrise and Sunset (UTC): ${mountainSunInfo.sunrise} & ${mountainSunInfo.sunset}</p>
                <img src="imgs/${foundMountain.img}" alt="${foundMountain.name}">`;
        });
    } else {
        // Clear the info block if no mountain is selected
        INFOBLOCK.innerHTML = ``;
    }
});

// Function to fetch sunrise/sunset times
async function getSunsetForMountain(lat, lng) {
    let response = await fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
}
