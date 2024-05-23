"use strict";

// Get references to the dropdown and info block elements
const MOUNTAINSEARCH = document.getElementById('mountainDropDown');
const INFOBLOCK = document.getElementById('infoBlock');

// Initialize the mountain dropdown
window.onload = () => {
    initMountainDropdown();
}

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

        // Clear previous content and show loading indicator
        //INFOBLOCK.innerHTML = `<p>Loading...</p>`;

        // Find the mountain based on the selected value
        let foundMountain = mountainsArray.find(mtn => mtn.name == selectedValue);
        let mountainSunInfo;

        // Timeout duration in milliseconds
        const timeoutDuration = 5000;
        INFOBLOCK.innerHTML =
                `
                <div class="d-flex justify-content-center mb-4">
                <img src="imgs/${foundMountain.img}" alt="${foundMountain.name}" class='drop-shadow-img' height=375px ">
                </div>
                <hr class="hrlarge my-5">
                <h2 class="card-title">${foundMountain.name}</h2>
                <p>${foundMountain.desc}</p>
                <span>Elevation: ${foundMountain.elevation} ft.</span><br>
                <span>Difficulty: ${foundMountain.effort}</span><br>
                <span data-tooltip="Latitude and Longitude">Location: ${foundMountain.coords.lat}, ${foundMountain.coords.lng}</span><br>
                <span>Sunrise and Sunset (UTC): Loading...</span>
                <div class="img-pad "></div>`;

        // Fetch sunrise and sunset times for the mountain
        Promise.race([
            getSunsetForMountain(foundMountain.coords.lat, foundMountain.coords.lng),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutDuration))
        ]).then(data => {
            mountainSunInfo = data.results;
            INFOBLOCK.innerHTML =
                `
                <div class="d-flex justify-content-center mb-4">
                <img src="imgs/${foundMountain.img}" alt="${foundMountain.name}" class='drop-shadow-img' height=375px ">
                </div>
                <hr class="hrlarge my-5">
                <h2 class="card-title">${foundMountain.name}</h2>
                <p>${foundMountain.desc}</p>
                <span>Elevation: ${foundMountain.elevation} ft.</span><br>
                <span>Difficulty: ${foundMountain.effort}</span><br>
                <span data-tooltip="Latitude and Longitude">Location: ${foundMountain.coords.lat}, ${foundMountain.coords.lng}</span><br>
                <span>Sunrise and Sunset (UTC): ${mountainSunInfo.sunrise} & ${mountainSunInfo.sunset}</span>
                <div class="img-pad "></div>`;
        }).catch(error => {
            if (error.message === 'Timeout') {
                INFOBLOCK.innerHTML =
                `
                <div class="d-flex justify-content-center mb-4">
                <img src="imgs/${foundMountain.img}" alt="${foundMountain.name}" class='drop-shadow-img' height=375px ">
                </div>
                <hr class="hrlarge my-5">
                <h2 class="card-title">${foundMountain.name}</h2>
                <p>${foundMountain.desc}</p>
                <span>Elevation: ${foundMountain.elevation} ft.</span><br>
                <span>Difficulty: ${foundMountain.effort}</span><br>
                <span data-tooltip="Latitude and Longitude">Location: ${foundMountain.coords.lat}, ${foundMountain.coords.lng}</span><br>
                <span>Sunrise and Sunset (UTC): There was an issue loading this data; sorry for the inconvience!</span>
                <div class="img-pad "></div>`;
            } else {
                INFOBLOCK.innerHTML = `<p>Error loading data. Please try again later.</p>`;
            }
            console.error('Error fetching sunset data:', error);
        });
    } else {
        // Clear the info block if no mountain is selected
        INFOBLOCK.innerHTML = `<p class="d-flex justify-content-center card-title">Please select a mountain from the dropdown</p>`;
    }
});


// Function to fetch sunrise/sunset times
async function getSunsetForMountain(lat, lng) {
    try {
        let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sunset data:', error);
        throw error;
    }
}

function getBlurbMain(mountainInfo){

}