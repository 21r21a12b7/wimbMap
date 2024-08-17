const ANIMATION_URL = 'busAnimation.json'; // Path to your animation file
const LOCAL_STORAGE_KEY = 'busAnimationData';

// Function to fetch and store the animation in local storage
function fetchAndStoreAnimation() {
    fetch(ANIMATION_URL)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            displayAnimation(data);
        })
        .catch(error => console.error('Error fetching animation:', error));
}

// Function to display the animation from given data
function displayAnimation(data) {
    const animationContainer = document.getElementById('animation-container');
    const lottiePlayer = document.createElement('lottie-player');
    lottiePlayer.setAttribute('background', 'transparent');
    lottiePlayer.setAttribute('speed', '1');
    lottiePlayer.setAttribute('loop', 'true');
    lottiePlayer.setAttribute('autoplay', 'true');
    lottiePlayer.style.width = '50%';
    lottiePlayer.style.height = '50%';

    // Embed the JSON data directly
    lottiePlayer.innerHTML = JSON.stringify(data);
    animationContainer.appendChild(lottiePlayer);
}

// Check if the animation is already in local storage
document.addEventListener('DOMContentLoaded', () => {
    const storedAnimation = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAnimation) {
        displayAnimation(JSON.parse(storedAnimation));
    } else {
        fetchAndStoreAnimation();
    }
});

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
        console.log('Service Worker registration failed:', error);
    });
}
