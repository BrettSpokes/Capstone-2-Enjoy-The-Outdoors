"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const phrases = [
        'Welcome to your next outdoor adventure!',
        'Discover the majestic mountains - check out our Mountains page!',
        'Explore the beauty of nature in our Parks section!'
    ];
    let currentIndex = 0;
    const carouselText = document.getElementById('carousel-text');

    setInterval(() => {
        currentIndex = (currentIndex + 1) % phrases.length;
        carouselText.textContent = phrases[currentIndex];
    }, 15000); // Change phrase every 15 seconds
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all the buttons
    const buttons = document.querySelectorAll('.btn');

    // Add click event listener to each button
    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Perform actions on button click
            const buttonText = button.textContent.trim().toLowerCase();

            // Navigate to the corresponding page based on the button text
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
                    console.log("Button clicked: " + buttonText);
                    break;
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all buttons in the second navbar
    const buttons = document.querySelectorAll('.navbar-second .nav-link.btn');

    // Find the width of the largest button
    let maxWidth = 0;
    buttons.forEach(function (button) {
        const buttonWidth = button.offsetWidth;
        if (buttonWidth > maxWidth) {
            maxWidth = buttonWidth;
        }
    });

    // Set the width of all buttons to the width of the largest button
    buttons.forEach(function (button) {
        button.style.width = maxWidth + 'px';
    });
});
