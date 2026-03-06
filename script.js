const fechaEvento = new Date("Oct 17, 2026 18:00:00").getTime();

// Función para actualizar el contador
function updateCountdown() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (distancia < 0) {
        clearInterval(x);
        countdownElement.innerHTML = "¡Llegó el día!";
    } else {
        // Generamos los círculos HTML inspirados en la imagen
        countdownElement.innerHTML = `
            <div class="circle-item"><span class="circle-num">${dias}</span><span class="circle-label">DÍAS</span></div>
            <div class="circle-item"><span class="circle-num">${horas}</span><span class="circle-label">HORAS</span></div>
            <div class="circle-item"><span class="circle-num">${minutos}</span><span class="circle-label">MINUTOS</span></div>
            <div class="circle-item"><span class="circle-num">${segundos}</span><span class="circle-label">SEGUNDOS</span></div>
        `;
    }
}

// Actualizamos cada segundo
const x = setInterval(updateCountdown, 1000);

// Ejecutamos una vez al cargar para no esperar el primer segundo
updateCountdown();