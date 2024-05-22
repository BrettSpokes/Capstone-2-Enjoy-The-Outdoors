"use strict"

// Get references to the dropdown and info block elements
const LOCATIONSEARCH = document.getElementById("locationSearch");
const PARKTYPESEARCH = document.getElementById("parkTypeSearch");
const INFOBLOCK = document.getElementById("info");


window.onload = () => {

    //Call functions to populate dropdowns
    initStateDropdown();
    initTypeDropdown();

    //Append function to events with buttons
    document.getElementById('btnStates').addEventListener('click', function () {
        displayListElements('state');
    });

    document.getElementById('btnCategory').addEventListener('click', function () {
        displayListElements('category');
    });

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

function displayListElements(type) {
    const lsc = document.getElementById('locationSearchContainer');
    const ptsc = document.getElementById('parkTypeSearchContainer');
    const prl = document.getElementById('parkResultList');

    switch (type) {
        case "state":
            lsc.style.display = "";
            prl.style.display = "";
            ptsc.style.display = "none";
            break;
        case "category":
            lsc.style.display = "none";
            ptsc.style.display = "";
            prl.style.display = "";
            break;
        default:
            lsc.style.display = "none";
            ptsc.style.display = "none";
            prl.style.display = "none";
            break;
    }
}

document.getElementById("locationSearch").addEventListener("change", function () {
    if (this.value) {
        const selectedValue = this.value;
        let foundparks = selectedValue === 'all' ? nationalParksArray : nationalParksArray.filter(park => park.State == selectedValue);
        INFOBLOCK.innerHTML = ``;
        let infoHtml = '';

        foundparks.forEach(foundpark => {
            if (foundpark.Visit) {
                infoHtml +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>
            <div id="visitButton" class="d-flex">
                <a class="btn btn-primary" href="${foundpark.Visit}">
                Visit Park Page!
                </a>
            </div>
            <hr class="hrlarge">`;
            }
            else {
                infoHtml +=
                    `<h2>${foundpark.LocationName}</h1>
            <p>${foundpark.LocationID}</p>
            <p>${foundpark.Address}</p>
            <p>${foundpark.City}</p>
            <hr class="hrlarge">`;
            }
        });

        // Remove the last <hr class="hrlarge">
        if (infoHtml.endsWith('<hr class="hrlarge">')) {
            infoHtml = infoHtml.slice(0, -20); // length of '<hr class="hrlarge">'
        }

        INFOBLOCK.innerHTML = infoHtml;
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