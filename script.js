const cards = document.querySelectorAll('.memory-card');

let hasFlippedCrad = false;
let firstCard, secondCard;
let lockBord = false;

function flipCard() {
    if (lockBord) return;
    if (this === firstCard) return;
    this.classList.toggle('flip');

    if (!hasFlippedCrad) {
        hasFlippedCrad = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    isMatch ? disableCards() : unflipCards();

};

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
};

function unflipCards() {
    lockBord = true;
    setTimeout(() => {

        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 500)
};

function resetBoard() {
    [hasFlippedCrad, lockBord] = [false, false];
    [firstCard, secondCard] = [null, null];
};

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));