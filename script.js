const fechaEvento = new Date("Oct 17, 2026 18:00:00").getTime();

function updateCountdown() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
        document.getElementById("countdown").innerHTML = "¡HOY ES EL DÍA!";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
        <div class="circle-item"><span class="circle-num">${dias}</span><span class="circle-label">DÍAS</span></div>
        <div class="circle-item"><span class="circle-num">${horas}</span><span class="circle-label">HRS</span></div>
        <div class="circle-item"><span class="circle-num">${minutos}</span><span class="circle-label">MIN</span></div>
        <div class="circle-item"><span class="circle-num">${segundos}</span><span class="circle-label">SEG</span></div>
    `;
}

setInterval(updateCountdown, 1000);
updateCountdown();