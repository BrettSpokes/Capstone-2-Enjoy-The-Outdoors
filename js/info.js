"use strict";

// Get references to the dropdown and info block elements
const MOUNTAINSEARCH = document.getElementById('mountainDropDown');
const INFOBLOCK = document.getElementById('infoBlock');


// Initialize the mountain dropdown
window.onload = () => {
    initMountainDropdown();
    initializeFromUrlParameter();

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

MOUNTAINSEARCH.addEventListener("change", handleMountainSearchChange);
// Event listener for dropdown change
// Function to handle mountain search change
function handleMountainSearchChange() {
    if (this.value) {
        const selectedValue = this.value;
        updateInfoBlock(selectedValue);
    } else {
        // Clear the info block if no mountain is selected
        INFOBLOCK.innerHTML = `<p class="d-flex justify-content-center card-title">Please select a mountain from the dropdown</p>`;
    }
}

// Function to update info block based on selected mountain name
function updateInfoBlock(selectedValue) {
    // Find the mountain based on the selected value
    let foundMountain = mountainsArray.find(mtn => mtn.name == selectedValue);
    let mountainSunInfo;

    // Timeout duration in milliseconds
    const timeoutDuration = 5000;
    INFOBLOCK.innerHTML =
        `${getBlurbMain(foundMountain)}<span>Sunrise and Sunset (UTC): Loading...</span>
            <div class="img-pad "></div>`;

    // Fetch sunrise and sunset times for the mountain
    Promise.race([
        getSunsetForMountain(foundMountain.coords.lat, foundMountain.coords.lng),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutDuration))
    ]).then(data => {
        mountainSunInfo = data.results;
        INFOBLOCK.innerHTML =
            `
            ${getBlurbMain(foundMountain)}<span>Sunrise and Sunset (UTC): ${mountainSunInfo.sunrise} & ${mountainSunInfo.sunset}</span>
            <div class="img-pad "></div>`;
    }).catch(error => {
        if (error.message === 'Timeout') {
            INFOBLOCK.innerHTML =
                `
                ${getBlurbMain(foundMountain)}<span>Sunrise and Sunset (UTC): There was an issue loading this data; sorry for the inconvenience!</span>
                <div class="img-pad "></div>`;
        } else {
            INFOBLOCK.innerHTML = `<p>Error loading data. Please try again later.</p>`;
        }
        console.error('Error fetching sunset data:', error);
    });
}

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

// Function to get query parameters from URL
function getParameterValue(parameterName) {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    return params.get(parameterName);
}

// Function to initialize the info block based on URL parameter
function initializeFromUrlParameter() {
    var selectedMountainName = getParameterValue('key1');
    if (selectedMountainName) {
        MOUNTAINSEARCH.value = selectedMountainName;
        updateInfoBlock(selectedMountainName);
    }
}

function getBlurbMain(mountainInfo) {
    return `<div class="d-flex justify-content-center mb-4">
    <img src="imgs/${mountainInfo.img}" alt="${mountainInfo.name}" class='drop-shadow-img img-fluid' height=auto ">
    </div>
    <hr class="hrlarge my-5">
    <h2 class="card-title">${mountainInfo.name}</h2>
    <p>${mountainInfo.desc}</p>
    <span>Elevation: ${mountainInfo.elevation} ft.</span><br>
    <span>Difficulty: ${mountainInfo.effort}</span><br>
    <span data-tooltip="Latitude and Longitude">Location: ${mountainInfo.coords.lat}, ${mountainInfo.coords.lng}</span><br>`
}