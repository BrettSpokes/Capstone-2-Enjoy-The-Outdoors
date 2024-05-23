# Capstone-2-Enjoy-The-Outdoors
 A website that helps a user find things to do to enjoy the great outdoors. The site specializes in finding national parks to enjoy and mountains to climb. Utiliznging HTML, CSS, and JavaScript.

# The pages include
Home - Features samples of the parks and mountains in a card with a link to the appropriate page.

Mountains - Features a dropdown that allows users to select a mountain from a predefined list.

Parks - Features two buttons to filter by either type of park, or the state the park is in.

# Home
<p>
<img src="imgs\readme-imgs\Home1.jpg" alt="Home Page" width="738">
</p>

# Mountains
<p>
<img src="imgs\readme-imgs\Mountain1.jpg" alt="Mountain Page" width="738">
</p>

# Parks
<p>
<img src="imgs\readme-imgs\Park1.jpg" alt="Park Page" width="738">
</p>

# Interesting Script
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

The reason this is interesting is because I had to add error catching due to an issue where if I load too many mountains in a short span, the API would stop returning the sunrise and sunset value, so I have to make code incase that issue occured during use.