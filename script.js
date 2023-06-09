let sequence = [];
let humanSequence = [];
let level = 0;

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

function humanTurn(level) {
    tileContainer.classList.remove('unclickable');
    info.textContent = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
}

function resetGame(text) {
    alert(text);
    sequence = [];
    humanSequence = [];
    level = 0;
    startButton.classList.remove('hidden');
    heading.textContent = 'Have fun !';
    info.classList.add('hidden');
    tileContainer.classList.add('unclickable');
}

function activateTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);
    const sound = document.querySelector(`[data-sound='${color}']`);

    tile.classList.add('activated');
    sound.play();

    setTimeout(() => {
        tile.classList.remove('activated');
    }, 300);
}

function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activateTile(color);
        }, (index + 1) * 600);
    });
}

function nextStep() {
    const tiles = ['red', 'green', 'blue', 'yellow'];
    const random = tiles[Math.floor(Math.random() * tiles.length)];

    return random;
}

function nextRound() {
    level += 1;


    tileContainer.classList.add('unclickable');

    info.textContent = 'Computer turn';

    heading.textContent = `Level ${level} `;


    const nextSequence = [...sequence];
    nextSequence.push(nextStep());
    playRound(nextSequence);

    sequence = [...nextSequence];
    setTimeout(() => {
        humanTurn(level);
    }, level * 600 + 1000);
}

function handleClick(tile) {
    const index = humanSequence.push(tile) - 1;
    const sound = document.querySelector(`[data-sound='${tile}']`);
    sound.play();

    const remainingTaps = sequence.length - humanSequence.length;

    if (humanSequence[index] !== sequence[index]) {
        resetGame('Game over !');
        return;
    }

    if (humanSequence.length === sequence.length) {
        if (humanSequence.length === 35) { // 35 car le jeu original se fini après 35 niveaux
            resetGame('Congrats! You just finished the game!');
            return;
        }
        humanSequence = [];
        info.textContent = "Let's go !";
        setTimeout(() => {
            nextRound();
        }, 1000);
        return;
    }

    info.textContent = `Only ${remainingTaps} tap !${remainingTaps > 1 ? 's' : ''
        }`;
}

function startGame() {
    startButton.classList.add('hidden');
    info.classList.remove('hidden');
    info.textContent = 'Wait for the computer';
    nextRound();

}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
    const { tile } = event.target.dataset;
    if (tile) handleClick(tile);
});

window.onload = function () {

    var seconds = 00;
    var tens = 00;
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var buttonStart = document.getElementById('button-start');
    var Interval;

    buttonStart.onclick = function () {

        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }




    function startTimer() {
        tens++;

        if (tens <= 9) {
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9) {
            appendTens.innerHTML = tens;

        }

        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9) {
            appendSeconds.innerHTML = seconds;
        }

    }


}