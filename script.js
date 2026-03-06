// 1. CONFIGURACIÓN INICIAL
const fechaEvento = new Date("Oct 17, 2026 18:00:00").getTime();

// 2. FUNCIÓN DE ANIMACIONES (REVEAL)
function revealSections() {
    const reveals = document.querySelectorAll(".reveal");
    
    reveals.forEach((section) => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 100; 

        if (elementTop < windowHeight - elementVisible) {
            section.classList.add("active");
        }
    });
}

// 3. TODO LO QUE NECESITA QUE EL HTML ESTÉ LISTO
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Lógica de Animaciones ---
    revealSections(); // Ejecuta para lo que ya es visible arriba
    window.addEventListener("scroll", revealSections);

    // --- Lógica del Contador ---
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- Lógica del Botón de Música ---
    const musicBtn = document.getElementById('music-btn');
    const music = document.getElementById('background-music');
    const musicIcon = document.getElementById('music-icon');

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                musicIcon.classList.replace('fa-music', 'fa-pause');
                musicBtn.classList.add('playing');
            } else {
                music.pause();
                musicIcon.classList.replace('fa-pause', 'fa-music');
                musicBtn.classList.remove('playing');
            }
        });
    }

    // --- Lógica de Confirmación (RSVP) ---
    const btnConfirmar = document.querySelector('.btn-rsvp');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', async () => {
            const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");
            if (!nombreInvitado || nombreInvitado.trim() === "") {
                alert("El nombre es necesario para la confirmación.");
                return; 
            }

            const webhookURL = "TU_URL_DE_GOOGLE_SCRIPT";
            const datos = {
                nombre: nombreInvitado.trim(),
                asistencia: "Confirmado",
                fecha: new Date().toLocaleString()
            };

            try {
                await fetch(webhookURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });
                alert("¡Listo " + nombreInvitado + "! Tu asistencia ha sido registrada.");
            } catch (error) {
                alert("Hubo un error de conexión.");
            }
        });
    }
});

// 4. FUNCIÓN DEL CONTADOR (Fuera del listener para que no sea anónima)
function updateCountdown() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;
    const divCountdown = document.getElementById("countdown");
    
    if (!divCountdown) return; 

    if (distancia < 0) {
        divCountdown.innerHTML = "¡LLEGÓ EL MOMENTO!";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    divCountdown.innerHTML = `
        <div class="circle-item"><span class="circle-num">${dias}</span><span class="circle-label">DÍAS</span></div>
        <div class="circle-item"><span class="circle-num">${horas}</span><span class="circle-label">HRS</span></div>
        <div class="circle-item"><span class="circle-num">${minutos}</span><span class="circle-label">MIN</span></div>
        <div class="circle-item"><span class="circle-num">${segundos}</span><span class="circle-label">SEG</span></div>
    `;
    
    divCountdown.classList.add('tick');
    setTimeout(() => divCountdown.classList.remove('tick'), 500);
}