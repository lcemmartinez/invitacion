// REVISA QUE TENGA LA PALABRA 'const' AL PRINCIPIO
const btnConfirmar = document.querySelector('.btn-rsvp');

if (btnConfirmar) { // Agregamos esta seguridad (Null Check)
    btnConfirmar.addEventListener('click', async () => {
        const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");

        if (!nombreInvitado || nombreInvitado.trim() === "") {
            alert("El nombre es necesario para la confirmación.");
            return; 
        }

        const webhookURL = 'TU_URL_AQUÍ'; 
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
            alert("Error de conexión.");
        }
    });
}