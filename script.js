if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}

// Add the animation to the page
document.addEventListener('DOMContentLoaded', () => {
    const animationContainer = document.getElementById('animation-container');
    const lottiePlayer = document.createElement('lottie-player');
    lottiePlayer.setAttribute('src', 'busAnimation.json');
    lottiePlayer.setAttribute('background', 'transparent');
    lottiePlayer.setAttribute('speed', '1');
    lottiePlayer.setAttribute('loop', 'true');
    lottiePlayer.setAttribute('autoplay', 'true');
    lottiePlayer.style.width = '50%';
    lottiePlayer.style.height = '50%';
    animationContainer.appendChild(lottiePlayer);
});
