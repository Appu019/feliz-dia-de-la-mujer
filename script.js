// Array de frases bonitas (cada frase aparece dos veces para el juego de memoria)
const frases = [
    "Eres fuerte, valiente y capaz de lograr todo lo que te propongas.",
    "La belleza de una mujer no está en su apariencia, sino en su alma y su corazón.",
    "Cada mujer es una historia única y especial. ¡Escribe la tuya con orgullo!",
    "El mundo necesita tu voz, tu luz y tu amor. ¡No te detengas!",
    "Eres el reflejo de la fuerza y la resiliencia. ¡Sigue adelante!",
    "La mujer es como una estrella: brilla en la oscuridad y guía a los demás.",
    "Tu poder no tiene límites. ¡Cree en ti misma!",
    "Eres una obra maestra en constante evolución. ¡Celebra tu esencia!",
];

// Duplicar las frases para el juego de memoria
const cartas = [...frases, ...frases];

// Mezclar las cartas aleatoriamente
cartas.sort(() => Math.random() - 0.5);

// Variables del juego
let cartasVolteadas = [];
let aciertos = 0;
const juego = document.getElementById('juego');
const mensaje = document.getElementById('mensaje');

// Función para crear las cartas
function crearCartas() {
    cartas.forEach((frase, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.indice = index;

        // Crear las caras de la carta
        const caraFrontal = document.createElement('div');
        caraFrontal.classList.add('cara', 'frontal');
        caraFrontal.textContent = ''; // Frente vacío

        const caraTrasera = document.createElement('div');
        caraTrasera.classList.add('cara', 'trasera');
        caraTrasera.textContent = frase; // Texto en la parte de atrás

        carta.appendChild(caraFrontal);
        carta.appendChild(caraTrasera);

        carta.addEventListener('click', voltearCarta);
        juego.appendChild(carta);
    });
}

// Función para voltear una carta
function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains('volteada')) {
        this.classList.add('volteada');
        cartasVolteadas.push(this);

        if (cartasVolteadas.length === 2) {
            setTimeout(verificarCoincidencia, 1000);
        }
    }
}

// Función para verificar si las cartas coinciden
function verificarCoincidencia() {
    const [carta1, carta2] = cartasVolteadas;

    if (carta1.querySelector('.trasera').textContent === carta2.querySelector('.trasera').textContent) {
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        aciertos++;
        mensaje.textContent = "¡Encontraste una coincidencia!";
    } else {
        carta1.classList.remove('volteada');
        carta2.classList.remove('volteada');
        mensaje.textContent = "Sigue intentándolo.";
    }

    cartasVolteadas = [];

    if (aciertos === frases.length) {
        mensaje.textContent = "¡Felicidades! Has encontrado todas las coincidencias.";
    }
}

// Iniciar el juego
crearCartas();