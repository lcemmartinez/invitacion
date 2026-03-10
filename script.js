// ---CONFIGURACION DEL CLIENTE
const CONFIG={
    nombreEvento: "baby shower",
    nombreFestejado: "Mateo",
    fecha: "Nov 25,2026 18:00:00",
    fechaa: "miércoles,25 de Noviembre ,2026",
    musicaURL: "assets/music/cancion.mp3",
    colorPrincipal: "#FFB6C1",//color principal
    mapaEmbedURL:"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15081.60543661906!2d-98.1666352!3d19.0900406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1772831108595!5m2!1ses!2smx",
    googleSheetURL: "https://script.google.com/macros/s/AKfycbzIcTbO5NOAgXlvfdZDumX4Xrj4RtLfhthcZloFKCZgkQrmlm0VE5uGCjGjAQU6F-gc/exec",
    itinerario:[
       { hora: "16:00 HRS", evento: "BIENVENIDA", icono: "fa-baby-carriage" },
        { hora: "17:00 HRS", evento: "JUEGOS", icono: "fa-puzzle-piece" },
        { hora: "18:30 HRS", evento: "MERIENDA", icono: "fa-cookie" }
    ]
};

// 1. CONFIGURACIÓN INICIAL
const fechaEvento = new Date(CONFIG.fecha).getTime();

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

// 2. FUNCIÓN PARA EL ITINERARIO DINÁMICO
function renderItinerario() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = "";
    CONFIG.itinerario.forEach(item => {
        container.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-icon"><i class="fas ${item.icono}"></i></div>
                <div class="timeline-content">
                    <span class="time">${item.hora}</span>
                    <p class="event">${item.evento}</p>
                </div>
            </div>`;
    });
}

function renderItinerario() {
    const container = document.getElementById('timeline-container');
    
    // Debug: Esto te dirá en la consola si el JS encontró el lugar correcto
    if (!container) {
        console.error("Error: No se encontró el contenedor 'timeline-container'");
        return;
    }

    container.innerHTML = ""; // Limpiamos contenido viejo

    CONFIG.itinerario.forEach(item => {
        // Creamos el HTML de cada item
        const divItem = document.createElement('div');
        divItem.className = 'timeline-item';
        divItem.innerHTML = `
            <div class="timeline-icon"><i class="fas ${item.icono}"></i></div>
            <div class="timeline-content">
                <span class="time">${item.hora}</span>
                <p class="event">${item.evento}</p>
            </div>
        `;
        container.appendChild(divItem);
    });
    console.log("Itinerario renderizado con éxito");
}


// 3. TODO LO QUE NECESITA QUE EL HTML ESTÉ LISTO
document.addEventListener("DOMContentLoaded", () => {
    // Inyectar textos
    const elNombre = document.getElementById('festejado-name');
    const elEvento = document.getElementById('evento-tipo');
    const laFecha = document.getElementById('event-date');
    
    if(elNombre) elNombre.innerText = CONFIG.nombreFestejado;
    if(elEvento) elEvento.innerText = CONFIG.nombreEvento;
    if(laFecha) laFecha.innerText = CONFIG.fechaa;

    // --- APLICAR COLOR PRINCIPAL DINÁMICAMENTE ---
if (CONFIG.colorPrincipal) {
    // Esto cambia la variable --gold en todo el CSS al color que elijas en CONFIG
    document.documentElement.style.setProperty('--gold', CONFIG.colorPrincipal);
}

    // Inyectar Itinerario
    renderItinerario();

    // Inyectar el mapa
    const iframeMapa = document.querySelector('.map-container iframe');
    if(iframeMapa) iframeMapa.src = CONFIG.mapaEmbedURL;
    
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

            const webhookURL = CONFIG.googleSheetURL;
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