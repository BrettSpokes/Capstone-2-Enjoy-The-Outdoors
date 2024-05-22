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
        }, 15000); // Change phrase every 15 seconds
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
});
