// Seleccionamos el botón
const btnConfirmar = document.querySelector('.btn-rsvp');

btnConfirmar.addEventListener('click', async () => {
    const nombreInvitado = prompt("Por favor, ingresa tu nombre completo:");
    
    if (nombreInvitado) {
        // La URL que copiaste de tu nodo Webhook en n8n
        const webhookURL = "https://script.google.com/macros/s/AKfycbzIcTbO5NOAgXlvfdZDumX4Xrj4RtLfhthcZloFKCZgkQrmlm0VE5uGCjGjAQU6F-gc/exec";

        const datos = {
            nombre: nombreInvitado,
            asistencia: "Confirmado",
            fecha: new Date().toLocaleString()
        };
        try {
            await fetch(webhookURL, {
                method: 'POST',
                mode: 'no-cors', // Agrega esta línea para evitar errores de seguridad
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
        
            // Como usamos 'no-cors', no podemos leer la respuesta 'ok', 
            // así que asumimos que se envió si no saltó al catch.
            alert("¡Gracias! Tu confirmación ha sido enviada.");
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("No se pudo enviar. Revisa tu conexión.");
        }
    }
});