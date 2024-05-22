"use strict"

// Get references to the dropdown and info block elements
const LOCATIONSEARCH = document.getElementById("locationSearch");
const PARKTYPESEARCH = document.getElementById("parkTypeSearch");
const INFOBLOCK = document.getElementById("info");

window.onload = () => {

    //Call functions to populate dropdowns
    initStateDropdown();
    initTypeDropdown();

}

// Get the dropdown element and reference the corresponding data array and populate lists
// initalize State Dropdown
function initStateDropdown() {
    let placeHolder = new Option('Select One...', '');
    LOCATIONSEARCH.appendChild(placeHolder);

    for (const VAL of locationsArray) {
        let theOption = new Option(VAL, VAL);
        LOCATIONSEARCH.appendChild(theOption);
    }

    let placeHolderAll = new Option('View All', 'all');
    LOCATIONSEARCH.appendChild(placeHolderAll);
}

// initalize Type Dropdown
function initTypeDropdown() {
    let placeHolder = new Option('Select One...', '');
    PARKTYPESEARCH.appendChild(placeHolder);

    for (const VAL of parkTypesArray) {
        let theOption = new Option(VAL, VAL);
        PARKTYPESEARCH.appendChild(theOption);
    }

    let placeHolderAll = new Option('View All', 'all');
    PARKTYPESEARCH.appendChild(placeHolderAll);
}

document.getElementById("locationSearch").addEventListener("change", function () {
    if (this.value) {
        const selectedValue = this.value;
        let foundparks = selectedValue === 'all' ? nationalParksArray : nationalParksArray.filter(park => park.State == selectedValue);
        INFOBLOCK.innerHTML = ``;

        foundparks.forEach(foundpark => {
            if (foundpark.Visit) {
                INFOBLOCK.innerHTML +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>
            <div id="visitButton" class="d-flex">
                <a class="btn btn-primary" href="${foundpark.Visit}">
                Visit Park Page!
                </a>
            </div>`;
            }
            else {
                INFOBLOCK.innerHTML +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>`;
            }
        });


    }
    else {
        INFOBLOCK.innerHTML = ``;
    }

    PARKTYPESEARCH.value = '';
});

document.getElementById("parkTypeSearch").addEventListener("change", function () {
    if (this.value) {
        const selectedValue = this.value;

        let foundparks = selectedValue === 'all' ? nationalParksArray : nationalParksArray.filter(park => park.LocationName.includes(selectedValue));

        console.log(foundparks);
        INFOBLOCK.innerHTML = ``;

        foundparks.forEach(foundpark => {
            if (foundpark.Visit) {
                INFOBLOCK.innerHTML +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>
            <div id="visitButton" class="d-flex">
                <a class="btn btn-primary" href="${foundpark.Visit}">
                Visit Park Page!
                </a>
            </div>`;
            }
            else {
                INFOBLOCK.innerHTML +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>`;
            }
        });

    }
    else {
        INFOBLOCK.innerHTML = ``;
    }

    LOCATIONSEARCH.value = '';
});