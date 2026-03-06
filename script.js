const btnConfirmar = document.querySelector('.btn-rsvp');
// Asegúrate de que la fecha sea futura (2026 como en tu meta de ser papá)
const fechaEvento = new Date("Oct 17, 2026 18:00:00").getTime();

function updateCountdown() {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    const divCountdown = document.getElementById("countdown");
    
    // Si el div no existe en el HTML, el script se detendría aquí
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
    // Agrega esta línea justo después de actualizar el innerHTML
divCountdown.classList.add('tick');
setTimeout(() => divCountdown.classList.remove('tick'), 500);
}

// Ejecutar cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

if (btnConfirmar) {
    btnConfirmar.addEventListener('click', async () => {
        console.log("Botón presionado..."); // Mensaje de diagnóstico 1

        const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");

        // Validación
        if (!nombreInvitado || nombreInvitado.trim() === "") {
            alert("El nombre es necesario para la confirmación.");
            return; 
        }

        console.log("Validación pasada para: " + nombreInvitado); // Mensaje de diagnóstico 2

        // IMPORTANTE: Asegúrate de que esta URL sea la de "Ejecutar" de Google Apps Script
        const webhookURL = "https://script.google.com/macros/s/AKfycbzIcTbO5NOAgXlvfdZDumX4Xrj4RtLfhthcZloFKCZgkQrmlm0VE5uGCjGjAQU6F-gc/exec";

        const datos = {
            nombre: nombreInvitado.trim(),
            asistencia: "Confirmado",
            fecha: new Date().toLocaleString()
        };

        try {
            console.log("Intentando enviar a Google Sheets..."); // Mensaje de diagnóstico 3
            
            await fetch(webhookURL, {
                method: 'POST',
                mode: 'no-cors', // Esto es vital para Google Scripts
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            // Con no-cors no recibimos respuesta del servidor, 
            // pero si llega aquí es porque la petición salió de tu PC.
            alert("¡Listo " + nombreInvitado + "! Tu asistencia ha sido registrada.");
            console.log("Petición enviada con éxito.");

        } catch (error) {
            console.error("Error detectado:", error);
            alert("Hubo un error de conexión.");
        }
    });
} else {
    console.error("Error: No se encontró el botón con la clase .btn-rsvp");
}

const musicBtn = document.getElementById('music-btn');
const music = document.getElementById('background-music');
const musicIcon = document.getElementById('music-icon');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicIcon.classList.remove('fa-music');
        musicIcon.classList.add('fa-pause');
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-music');
        musicBtn.classList.remove('playing');
    }
});

function revealSections() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((section) => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 150; // Distancia antes de que se active

        if (elementTop < windowHeight - elementVisible) {
            section.classList.add("active");
        }
    });
}

// Escuchar el evento de scroll
window.addEventListener("scroll", revealSections);

// Ejecutar una vez al cargar por si hay elementos visibles desde el inicio
revealSections();