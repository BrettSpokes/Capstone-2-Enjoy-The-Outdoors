"use strict"

const MOUNTAINSEARCH = document.getElementById('mountainDropDown');
const INFOBLOCK = document.getElementById('infoBlock');

window.onload = () => {
    initMountainDropdown();
}

// initalize State Dropdown
function initMountainDropdown() {
    let placeHolder = new Option('Select One...', '');
    MOUNTAINSEARCH.appendChild(placeHolder);

    for (const VAL of mountainsArray) {
        let theOption = new Option(VAL.name, VAL.name);
        MOUNTAINSEARCH.appendChild(theOption);
    }
}

MOUNTAINSEARCH.addEventListener("change", function () {
    if(this.value) {
    const selectedValue = this.value;
    
    let foundMountain = mountainsArray.find(mtn => mtn.name == selectedValue);

    console.log(foundMountain.coords.lat, foundMountain.coords.lng);
    let mountainSunInfo;
    getSunsetForMountain(foundMountain.coords.lat, foundMountain.coords.lng).then(data => {
        console.log(data.results)
       });;

    console.log(mountainSunInfo);
    INFOBLOCK.innerHTML = 
    `<h2>${foundMountain.name}</h1>
     <p>${foundMountain.desc}</p>
     <p>${foundMountain.elevation}</p>
     <p>Difficulty: ${foundMountain.effort}</p>
     <img src="imgs/${foundMountain.img}" alt="${foundMountain.name}">
     `;
 }
 else {
    INFOBLOCK.innerHTML = ``;
 }
 
 });


// function that can "fetch" the sunrise/sunset times
async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
   }
   
   