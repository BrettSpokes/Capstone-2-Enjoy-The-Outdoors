document.addEventListener('DOMContentLoaded', function () {
    const phrases = [
        'Welcome to your next outdoor adventure!',
        'Discover the majestic mountains - check out our Mountains page!',
        'Explore the beauty of nature on our Parks page!'
    ];
    let currentIndex = 0;
    const carouselText = document.getElementById('carousel-text');

    if (carouselText) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            carouselText.textContent = phrases[currentIndex];
        }, 8000); // Change phrase every 8 seconds
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = button.textContent.trim().toLowerCase();
            switch (buttonText) {
                case 'home':
                    window.location.href = 'index.html';
                    break;
                case 'mountains':
                    window.location.href = 'mountaininfo.html';
                    break;
                case 'parks':
                    window.location.href = 'nationalparks.html';
                    break;
                default:
                    break;
            }
        });
    });

    const navButtons = document.querySelectorAll('.navbar-second .nav-link.btn');
    if (navButtons.length) {
        let maxWidth = 0;
        navButtons.forEach(button => {
            const buttonWidth = button.offsetWidth;
            if (buttonWidth > maxWidth) {
                maxWidth = buttonWidth;
            }
        });
        navButtons.forEach(button => {
            button.style.width = maxWidth + 'px';
        });
    }

    // Function to get 4 random elements from an array
    function getRandomElements(arr, num) {
        const shuffled = arr.slice();
        let i = arr.length;
        let min = i - num;
        let temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    function displayRandomParks() {
        if (getCurrentPageName() == "index.html") {
            const RANDOMPARKS = getRandomElements(nationalParksArray, 2);
            const IMAGEPREVIEWROW = document.getElementById('imagePreviewParks');

            IMAGEPREVIEWROW.innerHTML = '';

            RANDOMPARKS.forEach(park => {
                let parkCard = `
                <div class="col-md-6 d-flex align-items-stretch pb-5">
                <div class="card text-center flex-fill">
                <div class="card-body d-flex flex-column">`

                parkCard += `<h5 class="card-title">${park.LocationName}</h5>`
                parkCard += `<p>`
                parkCard += park.Address ? `${park.Address} ` : '';
                parkCard += park.City ? ` ${park.City}, ` : '';
                parkCard += park.State ? `${park.State} ` : '';
                parkCard += park.ZipCode ? `${park.ZipCode}` : '';
                parkCard += `</p>`;
                parkCard += `<a href="nationalparks.html?key2=${park.LocationID}" class="btn mt-auto link-btn">Learn More</a>`;
                parkCard += `</div></div></div>`;

                IMAGEPREVIEWROW.insertAdjacentHTML('beforeend', parkCard);
            });
        }
    }


    // Function to display 4 random mountains
    function displayRandomMountains() {
        if (getCurrentPageName() == "index.html") {
            const randomMountains = getRandomElements(mountainsArray, 4);
            const imagePreviewRow = document.getElementById('imagePreviewRow');

            imagePreviewRow.innerHTML = '';

            randomMountains.forEach(mountain => {
                const mountainCard = `
                <div class="col-md-3 d-flex align-items-stretch pb-5">
                    <div class="card text-center flex-fill">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${mountain.name}</h5>
                            <img src="imgs/${mountain.img}" alt="${mountain.name}" class="drop-shadow-img img-fluid">
                            <p class="pt-4 card-text">This mountain's elevation is ${mountain.elevation}ft!</p>
                            <a href="mountaininfo.html?key1=${mountain.name}" class="btn mt-auto link-btn">Learn More</a>
                        </div>
                    </div>
                </div>
            `;
                imagePreviewRow.insertAdjacentHTML('beforeend', mountainCard);
            });
        }
    }

    // Call the function to display random mountains and parks on page load
    displayRandomParks();
    displayRandomMountains();
});

function getCurrentPageName() {
    var path = window.location.pathname;
    var pageName = path.split('/').pop(); // Get the last part of the path
    return pageName;
}