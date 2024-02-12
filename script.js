const confetti = window.confetti;
let noButtonClicked = false;
let heading = document.getElementById('heading');
let yesButton = document.getElementById('yesButton');
let noButton = document.getElementById('noButton');

function showCuteGif() {
    document.getElementById('gifContainer').style.display = 'block';
    disableButtons();
    resetButton();
    triggerConfetti();
}

function disableButtons() {
    heading.innerHTML = 'Yay! You said YES!';
    yesButton.style.display = 'none';
    noButton.style.display = 'none';
}

function runAway() {
    const button = document.getElementById('noButton');
    if (!noButtonClicked) {
        const maxX = Math.min(document.documentElement.clientWidth - button.offsetWidth, 800);
        const maxY = Math.min(document.documentElement.clientHeight - button.offsetHeight, 400);

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;

        randomX = Math.min(randomX, maxX - button.offsetWidth);
        randomY = Math.min(randomY, maxY - button.offsetHeight);

        button.style.transform = 'translateX(' + randomX + 'px) translateY(' + randomY + 'px)';
    }
}

function denyClick() {
    noButtonClicked = true;
    setTimeout(function() {
        resetButton();
    }, 800);
}

function resetButton() {
    const button = document.getElementById('noButton');
    button.style.transform = 'translateX(0) translateY(0)';
    noButtonClicked = false;
    
}

function triggerConfetti() {
    function animateConfetti() {
        confetti({
            particleCount: 6,
            spread: 180,
            origin: { x: Math.random(), y: -0.1 }
        });

        if (!stopConfetti) {
            requestAnimationFrame(animateConfetti);
        }
    }

    let stopConfetti = false;
    setTimeout(() => {
        stopConfetti = true;
    }, 80000); // Stop after 10 seconds (adjust as needed)

    animateConfetti();
}

const isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice) {
    noButton.addEventListener('touchstart', runAway);
} else {
    noButton.addEventListener('mouseover', runAway);
}

yesButton.addEventListener('click', showCuteGif);
noButton.addEventListener('click', denyClick);