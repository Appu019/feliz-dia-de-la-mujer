// Obtener elementos del DOM
const modal = document.getElementById('modal');
const button = document.getElementById('messageButton');
const closeButton = document.querySelector('.close');

// Mostrar la ventana emergente al hacer clic en el botón
button.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Ocultar la ventana emergente al hacer clic en la "X"
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Ocultar la ventana emergente al hacer clic fuera de ella
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Juego de memoria
const memoryGame = document.getElementById('memory-game');
const resetButton = document.getElementById('resetButton');
let cards = [];
let flippedCards = [];
let matchedCards = [];

// Datos de las cartas (nombre y logro)
const cardData = [
    { name: "Marie Curie", achievement: "Primera mujer en ganar un Premio Nobel." },
    { name: "Rosa Parks", achievement: "Pionera en la lucha por los derechos civiles." },
    { name: "Frida Kahlo", achievement: "Icono del arte y el feminismo en México." },
    { name: "Malala Yousafzai", achievement: "Activista por la educación de las niñas." },
];

// Duplicar y barajar las cartas
const shuffledCards = [...cardData, ...cardData].sort(() => Math.random() - 0.5);

// Crear las cartas del juego
function createCards() {
    shuffledCards.forEach((data, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.index = index;
        card.innerHTML = `
            <div class="front">📇</div>
            <div class="back">${data.name}<br>${data.achievement}</div>
        `;
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
        cards.push(card);
    });
}

// Voltear una carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards;
    const name1 = card1.querySelector('.back').textContent;
    const name2 = card2.querySelector('.back').textContent;

    if (name1 === name2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('¡Felicidades! Has encontrado todas las parejas.'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

// Reiniciar el juego
function resetGame() {
    memoryGame.innerHTML = '';
    cards = [];
    flippedCards = [];
    matchedCards = [];
    createCards();
}

// Inicializar el juego
createCards();

// Reiniciar el juego al hacer clic en el botón
resetButton.addEventListener('click', resetGame);