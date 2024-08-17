// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}

// Load animation
document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.getElementById('animation-container');
    const animationKey = 'busAnimation';

    // Check if animation is cached in local storage
    if (localStorage.getItem(animationKey)) {
        const animationData = JSON.parse(localStorage.getItem(animationKey));
        lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    } else {
        // Fetch and cache animation data
        fetch('/busAnimation.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(animationKey, JSON.stringify(data));
                lottie.loadAnimation({
                    container: animationContainer,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: data
                });
            })
            .catch(error => console.error('Error loading animation:', error));
    }
});
